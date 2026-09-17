"use client";

import * as React from "react";
import {
  Canvas,
  Textbox,
  Rect,
  Circle,
  Triangle,
  Line,
  FabricImage,
  ActiveSelection,
  type FabricObject,
  type TOptions,
  type FabricObjectProps,
} from "fabric";
import { uploadFile, type UploadResult, type UploadProgressEvent } from "@/lib/upload";
import {
  getAutosavedDesign,
  saveAutosavedDesign,
  clearAutosavedDesign,
} from "@/lib/design-studio-storage";
import {
  computeWorkingDimensions,
  addSvgToCanvas,
  dataUrlToFile,
  friendlyLayerName,
  EXPORT_DPI,
  type WorkingCanvasDimensions,
} from "./canvas-utils";
import type { LayerInfo, SelectedObjectProps } from "./types";

const HISTORY_DEBOUNCE_MS = 400;
const AUTOSAVE_DEBOUNCE_MS = 1000;
const MAX_HISTORY = 60;
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 3;

export type ShapeKind = "rect" | "rounded-rect" | "circle" | "triangle" | "line";
export type AlignEdge = "left" | "centerH" | "right" | "top" | "middleV" | "bottom";

function withId(obj: FabricObject): string {
  const anyObj = obj as unknown as { id?: string };
  if (!anyObj.id) {
    anyObj.id = crypto.randomUUID();
  }
  return anyObj.id;
}

function findById(canvas: Canvas, id: string): FabricObject | undefined {
  return canvas.getObjects().find((o) => (o as unknown as { id?: string }).id === id);
}

function buildSelectedProps(obj: FabricObject): SelectedObjectProps {
  const type = obj.type ?? "object";
  const isText = type === "textbox" || type === "i-text" || type === "text";
  const isImage = type === "image";
  const anyObj = obj as unknown as Record<string, unknown>;

  return {
    id: withId(obj),
    type,
    isText,
    isImage,
    isShape: !isText && !isImage,
    text: isText ? (anyObj.text as string) : undefined,
    fontFamily: isText ? (anyObj.fontFamily as string) : undefined,
    fontSize: isText ? (anyObj.fontSize as number) : undefined,
    fontWeight: isText ? (anyObj.fontWeight as string | number) : undefined,
    fontStyle: isText ? (anyObj.fontStyle as string) : undefined,
    underline: isText ? (anyObj.underline as boolean) : undefined,
    textAlign: isText ? (anyObj.textAlign as string) : undefined,
    fill: typeof anyObj.fill === "string" ? (anyObj.fill as string) : undefined,
    opacity: anyObj.opacity as number,
    stroke: typeof anyObj.stroke === "string" ? (anyObj.stroke as string) : undefined,
    strokeWidth: anyObj.strokeWidth as number,
  };
}

export interface UseDesignStudioOptions {
  productSlug: string;
  sessionId: string;
  widthIn: number;
  heightIn: number;
}

export function useDesignStudio({ productSlug, sessionId, widthIn, heightIn }: UseDesignStudioOptions) {
  const canvasElRef = React.useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = React.useRef<Canvas | null>(null);

  const historyRef = React.useRef<{ stack: string[]; index: number }>({ stack: [], index: -1 });
  const suspendHistoryRef = React.useRef(false);
  const historyTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const autosaveTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isReady, setIsReady] = React.useState(false);
  const [zoom, setZoomState] = React.useState(1);
  const [selected, setSelected] = React.useState<SelectedObjectProps | null>(null);
  const [layers, setLayers] = React.useState<LayerInfo[]>([]);
  const [canUndo, setCanUndo] = React.useState(false);
  const [canRedo, setCanRedo] = React.useState(false);
  const [lastSavedAt, setLastSavedAt] = React.useState<number | null>(null);

  const dims = React.useMemo<WorkingCanvasDimensions>(
    () => computeWorkingDimensions(widthIn, heightIn),
    [widthIn, heightIn]
  );

  const refreshLayers = React.useCallback((canvas: Canvas) => {
    const active = canvas.getActiveObjects();
    const list: LayerInfo[] = canvas
      .getObjects()
      .map((obj) => ({
        id: withId(obj),
        name: friendlyLayerName(obj),
        type: obj.type ?? "object",
        visible: obj.visible !== false,
        locked: obj.selectable === false,
        selected: active.includes(obj),
      }))
      .reverse();
    setLayers(list);
  }, []);

  const refreshSelection = React.useCallback(
    (canvas: Canvas) => {
      refreshLayers(canvas);
      const activeObjects = canvas.getActiveObjects();
      if (activeObjects.length !== 1) {
        setSelected(null);
        return;
      }
      setSelected(buildSelectedProps(activeObjects[0]));
    },
    [refreshLayers]
  );

  const saveNow = React.useCallback(
    (canvas: Canvas) => {
      const json = canvas.toObject(["id"]) as Record<string, unknown>;
      saveAutosavedDesign(productSlug, sessionId, { canvasJSON: json, widthIn, heightIn, savedAt: Date.now() });
      setLastSavedAt(Date.now());
    },
    [productSlug, sessionId, widthIn, heightIn]
  );

  const scheduleAutosave = React.useCallback(
    (canvas: Canvas) => {
      if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
      autosaveTimerRef.current = setTimeout(() => saveNow(canvas), AUTOSAVE_DEBOUNCE_MS);
    },
    [saveNow]
  );

  const pushHistorySnapshot = React.useCallback(
    (canvas: Canvas) => {
      const json = JSON.stringify(canvas.toObject(["id"]));
      const h = historyRef.current;
      const stack = h.stack.slice(0, h.index + 1);
      stack.push(json);
      const trimmed = stack.length > MAX_HISTORY ? stack.slice(stack.length - MAX_HISTORY) : stack;
      historyRef.current = { stack: trimmed, index: trimmed.length - 1 };
      setCanUndo(historyRef.current.index > 0);
      setCanRedo(false);
      scheduleAutosave(canvas);
    },
    [scheduleAutosave]
  );

  const scheduleHistoryPush = React.useCallback(
    (canvas: Canvas) => {
      if (suspendHistoryRef.current) return;
      if (historyTimerRef.current) clearTimeout(historyTimerRef.current);
      historyTimerRef.current = setTimeout(() => pushHistorySnapshot(canvas), HISTORY_DEBOUNCE_MS);
    },
    [pushHistorySnapshot]
  );

  const restoreSnapshot = React.useCallback(
    async (canvas: Canvas, json: string) => {
      suspendHistoryRef.current = true;
      try {
        await canvas.loadFromJSON(JSON.parse(json));
        canvas.discardActiveObject();
        canvas.requestRenderAll();
        refreshLayers(canvas);
        setSelected(null);
        scheduleAutosave(canvas);
      } finally {
        suspendHistoryRef.current = false;
      }
    },
    [refreshLayers, scheduleAutosave]
  );

  // ── Mount: create the canvas, restore autosaved work, wire events ──────
  React.useEffect(() => {
    const canvasEl = canvasElRef.current;
    if (!canvasEl) return;

    const canvas = new Canvas(canvasEl, {
      width: dims.pxWidth,
      height: dims.pxHeight,
      backgroundColor: "#ffffff",
      preserveObjectStacking: true,
    });
    fabricCanvasRef.current = canvas;

    const onMutate = () => {
      refreshLayers(canvas);
      scheduleHistoryPush(canvas);
    };
    canvas.on("object:added", onMutate);
    canvas.on("object:removed", onMutate);
    canvas.on("object:modified", onMutate);
    canvas.on("selection:created", () => refreshSelection(canvas));
    canvas.on("selection:updated", () => refreshSelection(canvas));
    canvas.on("selection:cleared", () => setSelected(null));
    canvas.on("text:changed", () => refreshSelection(canvas));

    let cancelled = false;
    (async () => {
      suspendHistoryRef.current = true;
      try {
        const saved = getAutosavedDesign(productSlug, sessionId);
        if (saved) {
          await canvas.loadFromJSON(saved.canvasJSON);
          canvas.requestRenderAll();
        }
      } catch {
        // Corrupt/incompatible autosave — start from a blank canvas.
      } finally {
        suspendHistoryRef.current = false;
      }
      if (cancelled) return;
      refreshLayers(canvas);
      pushHistorySnapshot(canvas);
      setIsReady(true);
    })();

    return () => {
      cancelled = true;
      if (historyTimerRef.current) clearTimeout(historyTimerRef.current);
      if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
      canvas.dispose();
      fabricCanvasRef.current = null;
    };
    // Mount once per product/session; dims are derived from query params that don't change mid-session.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSlug, sessionId]);

  // ── History ──────────────────────────────────────────────────────────
  const undo = React.useCallback(() => {
    const canvas = fabricCanvasRef.current;
    const h = historyRef.current;
    if (!canvas || h.index <= 0) return;
    h.index -= 1;
    setCanUndo(h.index > 0);
    setCanRedo(h.index < h.stack.length - 1);
    void restoreSnapshot(canvas, h.stack[h.index]);
  }, [restoreSnapshot]);

  const redo = React.useCallback(() => {
    const canvas = fabricCanvasRef.current;
    const h = historyRef.current;
    if (!canvas || h.index >= h.stack.length - 1) return;
    h.index += 1;
    setCanUndo(h.index > 0);
    setCanRedo(h.index < h.stack.length - 1);
    void restoreSnapshot(canvas, h.stack[h.index]);
  }, [restoreSnapshot]);

  // ── Adding content ──────────────────────────────────────────────────
  const addText = React.useCallback(
    (preset: "heading" | "subheading" | "body" = "body") => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;
      const width = Math.min(dims.pxWidth * 0.7, 420);
      const presets = {
        heading: { text: "Add a heading", fontSize: Math.max(24, Math.round(dims.pxHeight * 0.1)), fontWeight: 700 },
        subheading: { text: "Add a subheading", fontSize: Math.max(18, Math.round(dims.pxHeight * 0.06)), fontWeight: 600 },
        body: { text: "Add some body text", fontSize: Math.max(14, Math.round(dims.pxHeight * 0.04)), fontWeight: 400 },
      } as const;
      const { text: content, fontSize, fontWeight } = presets[preset];
      const textObj = new Textbox(content, {
        left: (dims.pxWidth - width) / 2,
        top: dims.pxHeight / 2 - fontSize / 2,
        width,
        fontSize,
        fontWeight,
        fontFamily: "Arial, sans-serif",
        fill: "#111111",
        textAlign: "left",
      });
      withId(textObj);
      canvas.add(textObj);
      canvas.setActiveObject(textObj);
      canvas.requestRenderAll();
    },
    [dims]
  );

  const addShape = React.useCallback(
    (kind: ShapeKind) => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;
      const size = Math.min(dims.pxWidth, dims.pxHeight) * 0.35;
      const common: TOptions<FabricObjectProps> = {
        left: (dims.pxWidth - size) / 2,
        top: (dims.pxHeight - size) / 2,
        fill: "#0B5D3B",
      };
      let obj: FabricObject;
      switch (kind) {
        case "rect":
          obj = new Rect({ ...common, width: size, height: size * 0.7 });
          break;
        case "rounded-rect":
          obj = new Rect({ ...common, width: size, height: size * 0.7, rx: size * 0.08, ry: size * 0.08 });
          break;
        case "circle":
          obj = new Circle({ ...common, radius: size / 2 });
          break;
        case "triangle":
          obj = new Triangle({ ...common, width: size, height: size * 0.87 });
          break;
        case "line":
          obj = new Line([0, 0, size, 0], {
            left: (dims.pxWidth - size) / 2,
            top: dims.pxHeight / 2,
            stroke: "#111111",
            strokeWidth: Math.max(2, size * 0.02),
          });
          break;
      }
      withId(obj);
      canvas.add(obj);
      canvas.setActiveObject(obj);
      canvas.requestRenderAll();
    },
    [dims]
  );

  const addImageFile = React.useCallback(
    async (file: File) => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });
      const img = await FabricImage.fromURL(dataUrl);
      const maxDim = Math.min(dims.pxWidth, dims.pxHeight) * 0.6;
      const naturalWidth = img.width ?? maxDim;
      const naturalHeight = img.height ?? maxDim;
      const scale = Math.min(1, maxDim / Math.max(naturalWidth, naturalHeight));
      img.set({
        left: (dims.pxWidth - naturalWidth * scale) / 2,
        top: (dims.pxHeight - naturalHeight * scale) / 2,
        scaleX: scale,
        scaleY: scale,
      });
      withId(img);
      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.requestRenderAll();
    },
    [dims]
  );

  const addElement = React.useCallback(
    async (src: string) => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;
      const targetSize = Math.min(dims.pxWidth, dims.pxHeight) * 0.3;
      const added = await addSvgToCanvas(canvas, src, {
        left: (dims.pxWidth - targetSize) / 2,
        top: (dims.pxHeight - targetSize) / 2,
        targetWidth: targetSize,
        targetHeight: targetSize,
      });
      added.forEach(withId);
      if (added.length) {
        canvas.setActiveObject(added.length > 1 ? new ActiveSelection(added, { canvas }) : added[0]);
      }
      canvas.requestRenderAll();
    },
    [dims]
  );

  const applyTemplate = React.useCallback(
    async (src: string) => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;
      if (canvas.getObjects().length > 0) {
        const confirmed = window.confirm("Replace your current design with this template?");
        if (!confirmed) return;
      }
      suspendHistoryRef.current = true;
      try {
        canvas.clear();
        canvas.backgroundColor = "#ffffff";
        const added = await addSvgToCanvas(canvas, src, {
          left: 0,
          top: 0,
          targetWidth: dims.pxWidth,
          targetHeight: dims.pxHeight,
        });
        added.forEach(withId);
        canvas.discardActiveObject();
        canvas.requestRenderAll();
        refreshLayers(canvas);
      } finally {
        suspendHistoryRef.current = false;
      }
      pushHistorySnapshot(canvas);
    },
    [dims, refreshLayers, pushHistorySnapshot]
  );

  // ── Editing the selection ───────────────────────────────────────────
  const updateSelected = React.useCallback(
    (patch: Record<string, unknown>) => {
      const canvas = fabricCanvasRef.current;
      const obj = canvas?.getActiveObject();
      if (!canvas || !obj) return;
      obj.set(patch);
      obj.setCoords();
      canvas.requestRenderAll();
      setSelected((prev) => (prev ? ({ ...prev, ...patch } as SelectedObjectProps) : prev));
      scheduleHistoryPush(canvas);
    },
    [scheduleHistoryPush]
  );

  const deleteSelected = React.useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const objects = canvas.getActiveObjects();
    if (!objects.length) return;
    canvas.discardActiveObject();
    objects.forEach((obj) => canvas.remove(obj));
    canvas.requestRenderAll();
  }, []);

  const duplicateSelected = React.useCallback(async () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const objects = canvas.getActiveObjects();
    if (!objects.length) return;

    const clones = await Promise.all(objects.map((obj) => obj.clone()));
    clones.forEach((clone) => {
      clone.set({ left: (clone.left ?? 0) + 16, top: (clone.top ?? 0) + 16 });
      (clone as unknown as { id?: string }).id = crypto.randomUUID();
      canvas.add(clone);
    });
    canvas.discardActiveObject();
    canvas.setActiveObject(clones.length > 1 ? new ActiveSelection(clones, { canvas }) : clones[0]);
    canvas.requestRenderAll();
  }, []);

  const reorder = React.useCallback(
    (action: "front" | "back" | "forward" | "backward") => {
      const canvas = fabricCanvasRef.current;
      const objects = canvas?.getActiveObjects();
      if (!canvas || !objects?.length) return;
      objects.forEach((obj) => {
        if (action === "front") canvas.bringObjectToFront(obj);
        else if (action === "back") canvas.sendObjectToBack(obj);
        else if (action === "forward") canvas.bringObjectForward(obj);
        else canvas.sendObjectBackwards(obj);
      });
      canvas.requestRenderAll();
      refreshLayers(canvas);
      scheduleHistoryPush(canvas);
    },
    [refreshLayers, scheduleHistoryPush]
  );

  const align = React.useCallback(
    (edge: AlignEdge) => {
      const canvas = fabricCanvasRef.current;
      const obj = canvas?.getActiveObject();
      if (!canvas || !obj) return;
      obj.setCoords();
      const bound = obj.getBoundingRect();
      const cw = canvas.getWidth();
      const ch = canvas.getHeight();
      let dx = 0;
      let dy = 0;
      switch (edge) {
        case "left":
          dx = -bound.left;
          break;
        case "centerH":
          dx = (cw - bound.width) / 2 - bound.left;
          break;
        case "right":
          dx = cw - bound.width - bound.left;
          break;
        case "top":
          dy = -bound.top;
          break;
        case "middleV":
          dy = (ch - bound.height) / 2 - bound.top;
          break;
        case "bottom":
          dy = ch - bound.height - bound.top;
          break;
      }
      obj.set({ left: (obj.left ?? 0) + dx, top: (obj.top ?? 0) + dy });
      obj.setCoords();
      canvas.requestRenderAll();
      scheduleHistoryPush(canvas);
    },
    [scheduleHistoryPush]
  );

  // ── Layers panel actions ────────────────────────────────────────────
  const selectLayer = React.useCallback((id: string) => {
    const canvas = fabricCanvasRef.current;
    const obj = canvas && findById(canvas, id);
    if (!canvas || !obj) return;
    canvas.setActiveObject(obj);
    canvas.requestRenderAll();
  }, []);

  const toggleLayerVisibility = React.useCallback(
    (id: string) => {
      const canvas = fabricCanvasRef.current;
      const obj = canvas && findById(canvas, id);
      if (!canvas || !obj) return;
      obj.set({ visible: !(obj.visible !== false) });
      canvas.requestRenderAll();
      refreshLayers(canvas);
      scheduleHistoryPush(canvas);
    },
    [refreshLayers, scheduleHistoryPush]
  );

  const toggleLayerLock = React.useCallback(
    (id: string) => {
      const canvas = fabricCanvasRef.current;
      const obj = canvas && findById(canvas, id);
      if (!canvas || !obj) return;
      const nextLocked = obj.selectable !== false;
      obj.set({
        selectable: !nextLocked,
        evented: !nextLocked,
        lockMovementX: nextLocked,
        lockMovementY: nextLocked,
        lockScalingX: nextLocked,
        lockScalingY: nextLocked,
        lockRotation: nextLocked,
      });
      if (nextLocked) canvas.discardActiveObject();
      canvas.requestRenderAll();
      refreshLayers(canvas);
      scheduleHistoryPush(canvas);
    },
    [refreshLayers, scheduleHistoryPush]
  );

  // ── Zoom ─────────────────────────────────────────────────────────────
  const setZoom = React.useCallback((value: number) => {
    const clamped = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));
    setZoomState(clamped);
    requestAnimationFrame(() => fabricCanvasRef.current?.calcOffset());
  }, []);

  const fitToScreen = React.useCallback(
    (containerWidth: number, containerHeight: number) => {
      if (!containerWidth || !containerHeight) return;
      const padding = 48;
      const fit = Math.min(
        (containerWidth - padding) / dims.pxWidth,
        (containerHeight - padding) / dims.pxHeight,
        1
      );
      setZoom(fit > 0 ? fit : 1);
    },
    [dims, setZoom]
  );

  // ── Export ───────────────────────────────────────────────────────────
  const exportAndUpload = React.useCallback(
    async (onProgress?: (event: UploadProgressEvent) => void): Promise<UploadResult> => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) throw new Error("Canvas isn't ready yet.");
      canvas.discardActiveObject();
      canvas.requestRenderAll();
      const multiplier = EXPORT_DPI / dims.dpi;
      const dataUrl = canvas.toDataURL({ format: "png", multiplier, quality: 1 });
      const file = await dataUrlToFile(dataUrl, `${productSlug}-design.png`);
      return uploadFile(file, { onProgress });
    },
    [dims, productSlug]
  );

  const clearAutosave = React.useCallback(() => {
    clearAutosavedDesign(productSlug, sessionId);
  }, [productSlug, sessionId]);

  return {
    canvasElRef,
    dims,
    isReady,
    zoom,
    setZoom,
    fitToScreen,
    selected,
    layers,
    canUndo,
    canRedo,
    lastSavedAt,
    undo,
    redo,
    addText,
    addShape,
    addImageFile,
    addElement,
    applyTemplate,
    updateSelected,
    deleteSelected,
    duplicateSelected,
    reorder,
    align,
    selectLayer,
    toggleLayerVisibility,
    toggleLayerLock,
    exportAndUpload,
    clearAutosave,
  };
}

export type DesignStudioController = ReturnType<typeof useDesignStudio>;
