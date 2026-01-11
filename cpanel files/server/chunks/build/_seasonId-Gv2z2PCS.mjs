import { j as jsxRuntimeExports, r as reactExports } from "./server.mjs";
import { d as useNavigate, B as Route$s, q as queryOptions, c as createLucideIcon, C as getSeasonForRegistration } from "./router-gg-f3raf.mjs";
import { u as useSuspenseQuery } from "./useSuspenseQuery-Dsh8g2Xj.mjs";
import { u as useForm, a, b as useWatch, F as Form, c as FormField, d as FormItem, e as FormLabel, f as FormControl, g as FormMessage, h as FormDescription } from "./form-DK4w9Pw1.mjs";
import { B as Button, u as useComposedRefs, c as composeRefs } from "./button-DAUfPp-T.mjs";
import { I as Input } from "./input-D8ww6-y3.mjs";
import { T as Textarea } from "./textarea-1TG3IgRf.mjs";
import { P as Presence, u as useControllableState, c as composeEventHandlers } from "./index-DXtQiGwN.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, C as Check, u as usePrevious, e as useSize } from "./select-BBeMvt5U.mjs";
import { c as cn } from "./utils-D4_p2_-I.mjs";
import { C as Card, b as CardHeader, d as CardTitle, a as CardContent } from "./card-ClXHriap.mjs";
import { L as Label } from "./label-C0ISNo_U.mjs";
import { X } from "./x-qTweREMH.mjs";
import { U as Users } from "./users-BvmkJGmf.mjs";
import { M as Mail } from "./mail-0w0x2g5k.mjs";
import { P as Phone } from "./phone-D-ASpsNE.mjs";
import { U as User } from "./user-DvzdKynG.mjs";
import { C as CircleAlert } from "./circle-alert-DfwXxVVq.mjs";
import { M as MapPin } from "./map-pin-iq44-sa-.mjs";
import { H as Heart } from "./heart-DS7jD7C0.mjs";
import { P as Plus } from "./plus-DU_Oax2u.mjs";
import { M as MessageSquare } from "./message-square-xF6Yp3vk.mjs";
import { S as Shield } from "./shield-Dy22rVVt.mjs";
import { C as CreditCard } from "./credit-card-pZFnxz0e.mjs";
import { ax as object, ay as string, aA as boolean$1, aC as array, aB as _enum } from "./db-COtzJr4P.mjs";
import { Z as ZodIssueCode } from "./auth-DnREO_GR.mjs";
import { C as Clock } from "./clock-BEPwIiZV.mjs";
import { C as Calendar } from "./calendar-CzOox_IF.mjs";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
import "./middleware-BXaiHw3P.mjs";
import "os";
import "fs";
import "net";
import "tls";
import "perf_hooks";
import "./aggregate-BaXeGeea.mjs";
import "./users.schema-CUS3FIEB.mjs";
import "./useBaseQuery-DdO5QD3T.mjs";
import "./index-DzSr385F.mjs";
const __iconNode$5 = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode$5);
const __iconNode$4 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode$4);
const __iconNode$3 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z",
      key: "1wgbhj"
    }
  ]
];
const Shirt = createLucideIcon("shirt", __iconNode$1);
const __iconNode = [
  ["path", { d: "M12 4v16", key: "1654pz" }],
  ["path", { d: "M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2", key: "e0r10z" }],
  ["path", { d: "M9 20h6", key: "s66wpe" }]
];
const Type = createLucideIcon("type", __iconNode);
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      const { scope, children, ...context } = props;
      const Context = scope?.[scopeName]?.[index] || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      const Context = scope?.[scopeName]?.[index] || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = scope?.[scopeName] || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = reactExports.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    const childrenArray = reactExports.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (reactExports.Children.count(newElement) > 1) return reactExports.Children.only(null);
          return reactExports.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: reactExports.isValidElement(newElement) ? reactExports.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = reactExports.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    if (reactExports.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== reactExports.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return reactExports.cloneElement(children, props2);
    }
    return reactExports.Children.count(children) > 1 ? reactExports.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = /* @__PURE__ */ Symbol("radix.slottable");
function isSlottable(child) {
  return reactExports.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot = /* @__PURE__ */ createSlot(`Primitive.${node}`);
  const Node = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
  const {
    __scopeCheckbox,
    checked: checkedProp,
    children,
    defaultChecked,
    disabled,
    form,
    name,
    onCheckedChange,
    required,
    value = "on",
    // @ts-expect-error
    internal_do_not_use_render
  } = props;
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: CHECKBOX_NAME
  });
  const [control, setControl] = reactExports.useState(null);
  const [bubbleInput, setBubbleInput] = reactExports.useState(null);
  const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
  const isFormControl = control ? !!form || !!control.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    true
  );
  const context = {
    checked,
    disabled,
    setChecked,
    control,
    setControl,
    name,
    form,
    value,
    hasConsumerStoppedPropagationRef,
    required,
    defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
    isFormControl,
    bubbleInput,
    setBubbleInput
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxProviderImpl,
    {
      scope: __scopeCheckbox,
      ...context,
      children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    }
  );
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = reactExports.forwardRef(
  ({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
    const {
      control,
      value,
      disabled,
      checked,
      required,
      setControl,
      setChecked,
      hasConsumerStoppedPropagationRef,
      isFormControl,
      bubbleInput
    } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setControl);
    const initialCheckedStateRef = reactExports.useRef(checked);
    reactExports.useEffect(() => {
      const form = control?.form;
      if (form) {
        const reset = () => setChecked(initialCheckedStateRef.current);
        form.addEventListener("reset", reset);
        return () => form.removeEventListener("reset", reset);
      }
    }, [control, setChecked]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: composeEventHandlers(onKeyDown, (event) => {
          if (event.key === "Enter") event.preventDefault();
        }),
        onClick: composeEventHandlers(onClick, (event) => {
          setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
          if (bubbleInput && isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
          }
        })
      }
    );
  }
);
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCheckbox,
      name,
      checked,
      defaultChecked,
      required,
      disabled,
      value,
      onCheckedChange,
      form,
      ...checkboxProps
    } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckboxProvider,
      {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxTrigger,
            {
              ...checkboxProps,
              ref: forwardedRef,
              __scopeCheckbox
            }
          ),
          isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxBubbleInput,
            {
              __scopeCheckbox
            }
          )
        ] })
      }
    );
  }
);
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Presence,
      {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: { pointerEvents: "none", ...props.style }
          }
        )
      }
    );
  }
);
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = reactExports.forwardRef(
  ({ __scopeCheckbox, ...props }, forwardedRef) => {
    const {
      control,
      hasConsumerStoppedPropagationRef,
      checked,
      defaultChecked,
      required,
      disabled,
      name,
      value,
      form,
      bubbleInput,
      setBubbleInput
    } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = bubbleInput;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      const bubbles = !hasConsumerStoppedPropagationRef.current;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        input.indeterminate = isIndeterminate(checked);
        setChecked.call(input, isIndeterminate(checked) ? false : checked);
        input.dispatchEvent(event);
      }
    }, [bubbleInput, prevChecked, checked, hasConsumerStoppedPropagationRef]);
    const defaultCheckedRef = reactExports.useRef(isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
  return typeof value === "function";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
const Checkbox = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Checkbox$1,
  {
    ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxIndicator, { className: cn("flex items-center justify-center text-current"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) })
  }
));
Checkbox.displayName = Checkbox$1.displayName;
function SignatureCapture({ value, onChange, signerName, error }) {
  const [mode, setMode] = reactExports.useState("adopt");
  const [typedName, setTypedName] = reactExports.useState("");
  const [isDrawing, setIsDrawing] = reactExports.useState(false);
  const canvasRef = reactExports.useRef(null);
  const lastPointRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (mode === "draw" && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = "#1e3a5f";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
      }
    }
  }, [mode]);
  const handleAdoptSignature = () => {
    if (typedName.trim()) {
      const signatureData = `ADOPTED:${typedName.trim()}:${(/* @__PURE__ */ new Date()).toISOString()}`;
      onChange(signatureData);
    }
  };
  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    }
  };
  const startDrawing = (e) => {
    e.preventDefault();
    const coords = getCoordinates(e);
    if (coords) {
      setIsDrawing(true);
      lastPointRef.current = coords;
    }
  };
  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing || !canvasRef.current || !lastPointRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    const coords = getCoordinates(e);
    if (!ctx || !coords) return;
    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    lastPointRef.current = coords;
  };
  const stopDrawing = () => {
    if (isDrawing && canvasRef.current) {
      setIsDrawing(false);
      lastPointRef.current = null;
      const dataUrl = canvasRef.current.toDataURL("image/png");
      onChange(dataUrl);
    }
  };
  const clearCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        onChange("");
      }
    }
  };
  const isAdoptedSignature = value.startsWith("ADOPTED:");
  const isDrawnSignature = value.startsWith("data:image");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-base font-semibold", children: [
      "Electronic Signature ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: mode === "adopt" ? "default" : "outline",
          onClick: () => setMode("adopt"),
          className: "flex-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Type, { className: "mr-2 h-4 w-4" }),
            "Adopt Signature"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: mode === "draw" ? "default" : "outline",
          onClick: () => setMode("draw"),
          className: "flex-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "mr-2 h-4 w-4" }),
            "Draw Signature"
          ]
        }
      )
    ] }),
    mode === "adopt" && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mb-2", children: "Signature Adoption Disclaimer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: 'By typing your name below and clicking "Adopt Signature", you agree that your typed name constitutes your legal electronic signature. This signature has the same legal validity as a handwritten signature under the Electronic Signatures in Global and National Commerce Act (E-SIGN) and the Uniform Electronic Transactions Act (UETA).' })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "typed-signature", children: "Type your full legal name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "typed-signature",
            placeholder: signerName || "Enter your full name",
            value: typedName,
            onChange: (e) => setTypedName(e.target.value)
          }
        )
      ] }),
      typedName && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Signature Preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-24 items-center justify-center rounded-lg border-2 border-dashed bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-3xl text-primary",
            style: { fontFamily: 'cursive, "Brush Script MT", "Segoe Script"' },
            children: typedName
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          onClick: handleAdoptSignature,
          disabled: !typedName.trim(),
          className: "w-full",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mr-2 h-4 w-4" }),
            "Adopt This Signature"
          ]
        }
      ),
      isAdoptedSignature && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-success", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }),
        "Signature adopted successfully"
      ] })
    ] }) }),
    mode === "draw" && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Use your finger (on mobile) or mouse (on desktop) to draw your signature below. Your drawn signature will be captured and stored securely." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Draw your signature" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", size: "sm", onClick: clearCanvas, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "mr-2 h-4 w-4" }),
            "Clear"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border-2 border-dashed bg-white p-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "canvas",
          {
            ref: canvasRef,
            width: 500,
            height: 150,
            className: "w-full cursor-crosshair touch-none",
            style: { height: "150px" },
            onMouseDown: startDrawing,
            onMouseMove: draw,
            onMouseUp: stopDrawing,
            onMouseLeave: stopDrawing,
            onTouchStart: startDrawing,
            onTouchMove: draw,
            onTouchEnd: stopDrawing
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Sign within the box above" })
      ] }),
      isDrawnSignature && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-success", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }),
        "Signature captured"
      ] })
    ] }) }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error }),
    value && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-success/10 p-3 text-sm text-success", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "inline mr-2 h-4 w-4" }),
      isAdoptedSignature ? `Signature adopted by: ${value.split(":")[1]}` : "Signature captured successfully"
    ] })
  ] });
}
function generateChallenge() {
  const operations = ["+", "-"];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  let num1;
  let num2;
  let answer;
  if (operation === "+") {
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
    answer = num1 + num2;
  } else {
    num1 = Math.floor(Math.random() * 10) + 5;
    num2 = Math.floor(Math.random() * num1);
    answer = num1 - num2;
  }
  return {
    question: `What is ${num1} ${operation} ${num2}?`,
    answer: answer.toString()
  };
}
function SpamProtection({ onVerified, error }) {
  const [challenge, setChallenge] = reactExports.useState(() => generateChallenge());
  const [userAnswer, setUserAnswer] = reactExports.useState("");
  const [isVerified, setIsVerified] = reactExports.useState(false);
  const [showError, setShowError] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (userAnswer === challenge.answer) {
      setIsVerified(true);
      setShowError(false);
      onVerified(true);
    } else if (userAnswer.length > 0 && userAnswer !== challenge.answer.slice(0, userAnswer.length)) {
      setShowError(true);
      setIsVerified(false);
      onVerified(false);
    } else {
      setShowError(false);
      setIsVerified(false);
      onVerified(false);
    }
  }, [userAnswer, challenge.answer, onVerified]);
  const refreshChallenge = () => {
    setChallenge(generateChallenge());
    setUserAnswer("");
    setIsVerified(false);
    setShowError(false);
    onVerified(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-base font-semibold", children: [
      "Security Verification ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border bg-muted/30 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Please answer the following question to verify you're human:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-medium", children: challenge.question }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "text",
              inputMode: "numeric",
              pattern: "[0-9]*",
              value: userAnswer,
              onChange: (e) => setUserAnswer(e.target.value.replace(/[^0-9-]/g, "")),
              className: "w-20",
              placeholder: "?"
            }
          ),
          isVerified && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-success", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Verified" })
          ] }),
          showError && !isVerified && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-destructive", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Incorrect" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "icon",
          onClick: refreshChallenge,
          title: "Get a new question",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" })
        }
      )
    ] }) }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error })
  ] });
}
const RETURNING_PLAYER_FEE = 60;
const NEW_PLAYER_FEE = 80;
const registrationSchema = object({
  // Parent/Guardian Contact - FIRST for lead capture
  parentGuardianName: string().min(1, "Parent/Guardian name is required"),
  email: string().email("Please enter a valid email address"),
  phone: string().min(10, "Valid phone number is required"),
  // Player Information
  firstName: string().min(1, "First name is required"),
  lastName: string().min(1, "Last name is required"),
  gender: _enum(["male", "female"], { required_error: "Please select gender" }),
  dateOfBirth: string().min(1, "Date of birth is required"),
  // Address
  streetAddress: string().min(1, "Street address is required"),
  city: string().min(1, "City is required"),
  state: string().min(1, "State is required"),
  zipCode: string().min(5, "Valid zip code is required"),
  // Returning player
  isReturningPlayer: boolean$1().default(false),
  requestedTeam: string().optional(),
  // Required fields
  uniformSize: string().min(1, "Uniform size is required"),
  // Optional fields
  volunteerRole: string().optional(),
  comments: string().optional(),
  // Additional players
  additionalPlayers: array(
    object({
      firstName: string().min(1, "First name is required"),
      lastName: string().min(1, "Last name is required"),
      gender: _enum(["male", "female"]),
      dateOfBirth: string().min(1, "Date of birth is required"),
      uniformSize: string().min(1, "Uniform size is required"),
      isReturningPlayer: boolean$1().default(false),
      requestedTeam: string().optional()
    })
  ).optional(),
  // Agreements
  agreeToTerms: boolean$1().refine((val) => val === true, {
    message: "You must agree to the terms and conditions"
  }),
  // Signature
  signature: string().min(1, "Signature is required")
}).superRefine((data, ctx) => {
  if (data.isReturningPlayer && (!data.requestedTeam || data.requestedTeam.trim() === "")) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: "Returning players must specify their team from Fall 2025",
      path: ["requestedTeam"]
    });
  }
  data.additionalPlayers?.forEach((player, index) => {
    if (player.isReturningPlayer && (!player.requestedTeam || player.requestedTeam.trim() === "")) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: "Returning players must specify their team from Fall 2025",
        path: ["additionalPlayers", index, "requestedTeam"]
      });
    }
  });
});
const UNIFORM_SIZES = [
  { value: "youth-s", label: "Youth Small" },
  { value: "youth-m", label: "Youth Medium" },
  { value: "youth-l", label: "Youth Large" },
  { value: "adult-s", label: "Adult Small" },
  { value: "adult-m", label: "Adult Medium" },
  { value: "adult-l", label: "Adult Large" },
  { value: "adult-xl", label: "Adult XL" }
];
const VOLUNTEER_ROLES = [
  { value: "coach", label: "Coach" },
  { value: "assistant-coach", label: "Assistant Coach" },
  { value: "referee", label: "Referee" },
  { value: "team-sponsor-150", label: "Team Sponsor ($150)" },
  { value: "sign-sponsor-300", label: "Sign Sponsor ($300)" }
];
const REQUIRED_FIELDS = [
  "parentGuardianName",
  "email",
  "phone",
  "firstName",
  "lastName",
  "gender",
  "dateOfBirth",
  "streetAddress",
  "city",
  "state",
  "zipCode",
  "uniformSize",
  "agreeToTerms",
  "signature"
];
function SinglePageRegistration({
  seasonId,
  seasonName,
  onSuccess
}) {
  const [isSpamVerified, setIsSpamVerified] = reactExports.useState(false);
  const [additionalPlayerCount, setAdditionalPlayerCount] = reactExports.useState(0);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const form = useForm({
    resolver: a(registrationSchema),
    defaultValues: {
      parentGuardianName: "",
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      gender: void 0,
      dateOfBirth: "",
      streetAddress: "",
      city: "",
      state: "FL",
      zipCode: "",
      isReturningPlayer: false,
      requestedTeam: "",
      uniformSize: "",
      volunteerRole: "",
      comments: "",
      additionalPlayers: [],
      agreeToTerms: false,
      signature: ""
    },
    mode: "onChange"
  });
  const watchedValues = useWatch({ control: form.control });
  const isReturningPlayer = watchedValues.isReturningPlayer;
  const progressPercentage = reactExports.useMemo(() => {
    let filledCount = 0;
    const totalRequired = REQUIRED_FIELDS.length + (isReturningPlayer ? 1 : 0);
    for (const field of REQUIRED_FIELDS) {
      const value = watchedValues[field];
      if (field === "agreeToTerms") {
        if (value === true) filledCount++;
      } else if (field === "gender") {
        if (value && value !== void 0) filledCount++;
      } else if (typeof value === "string" && value.trim() !== "") {
        filledCount++;
      }
    }
    if (isReturningPlayer && watchedValues.requestedTeam?.trim()) {
      filledCount++;
    }
    return Math.round(filledCount / totalRequired * 100);
  }, [watchedValues, isReturningPlayer]);
  const getPrimaryPlayerFee = () => {
    return isReturningPlayer ? RETURNING_PLAYER_FEE : NEW_PLAYER_FEE;
  };
  const calculateTotalPrice = () => {
    let total = getPrimaryPlayerFee();
    const additionalPlayers = watchedValues.additionalPlayers || [];
    for (const player of additionalPlayers) {
      total += player.isReturningPlayer ? RETURNING_PLAYER_FEE : NEW_PLAYER_FEE;
    }
    return total;
  };
  const totalPrice = calculateTotalPrice();
  const handleAddPlayer = () => {
    if (additionalPlayerCount < 5) {
      setAdditionalPlayerCount((prev) => prev + 1);
      const currentPlayers = form.getValues("additionalPlayers") || [];
      form.setValue("additionalPlayers", [
        ...currentPlayers,
        {
          firstName: "",
          lastName: "",
          gender: "male",
          dateOfBirth: "",
          uniformSize: "",
          isReturningPlayer: false,
          requestedTeam: ""
        }
      ]);
    }
  };
  const handleRemovePlayer = (index) => {
    setAdditionalPlayerCount((prev) => prev - 1);
    const currentPlayers = form.getValues("additionalPlayers") || [];
    form.setValue(
      "additionalPlayers",
      currentPlayers.filter((_, i) => i !== index)
    );
  };
  const handleSpamVerified = reactExports.useCallback((verified) => {
    setIsSpamVerified(verified);
  }, []);
  const onSubmit = async (data) => {
    if (!isSpamVerified) {
      return;
    }
    setIsSubmitting(true);
    try {
      console.log("Registration data:", data);
      console.log("Season ID:", seasonId);
      console.log("Total:", totalPrice);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onSuccess?.(data);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl space-y-6 p-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Player Registration" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-lg text-muted-foreground", children: seasonName })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 py-4 -mx-4 px-4 border-b", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Registration Progress" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-primary", children: [
          progressPercentage,
          "% Complete"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-full bg-primary transition-all duration-300 ease-out rounded-full",
          style: { width: `${progressPercentage}%` }
        }
      ) }),
      progressPercentage === 100 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-success mt-2 text-center", children: "All required fields complete! Review and submit below." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { ...form, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "bg-primary/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold", children: "Parent/Guardian Contact" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "We'll use this information to keep you updated on registration and the season" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid gap-6 pt-6 md:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FormField,
            {
              control: form.control,
              name: "parentGuardianName",
              render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(FormLabel, { children: [
                  "Full Name ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Enter your full name", ...field }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FormField,
            {
              control: form.control,
              name: "email",
              render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(FormLabel, { children: [
                  "Email Address ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "pl-10", placeholder: "email@example.com", ...field })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FormField,
            {
              control: form.control,
              name: "phone",
              render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(FormLabel, { children: [
                  "Cell Phone ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "pl-10", placeholder: "(555) 555-5555", ...field })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
              ] })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold", children: "Player Information" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FormField,
            {
              control: form.control,
              name: "isReturningPlayer",
              render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { className: "flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4 bg-muted/30", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: field.value, onCheckedChange: field.onChange }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 leading-none flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(FormLabel, { className: "text-base font-medium flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4 text-primary" }),
                    "Returning Player from Fall 2025"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(FormDescription, { children: [
                    "Check this box if your player participated in the Fall 2025 season and is returning to the same team.",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block mt-1 font-medium text-success", children: [
                      "Returning players: $",
                      RETURNING_PLAYER_FEE,
                      " | New players: $",
                      NEW_PLAYER_FEE
                    ] })
                  ] })
                ] })
              ] })
            }
          ),
          isReturningPlayer && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-amber-800 dark:text-amber-200", children: "Returning Player Notice" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-amber-700 dark:text-amber-300", children: "Player must use their uniform from the Fall 2025 season. No new uniform will be issued." })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                control: form.control,
                name: "firstName",
                render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(FormLabel, { children: [
                    "Player First Name ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Enter first name", ...field }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                control: form.control,
                name: "lastName",
                render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(FormLabel, { children: [
                    "Player Last Name ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Enter last name", ...field }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                control: form.control,
                name: "gender",
                render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(FormLabel, { children: [
                    "Gender ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { onValueChange: field.onChange, value: field.value, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select gender" }) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "male", children: "Male" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "female", children: "Female" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                control: form.control,
                name: "dateOfBirth",
                render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(FormLabel, { children: [
                    "Date of Birth ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", ...field }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                control: form.control,
                name: "uniformSize",
                render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Shirt, { className: "h-4 w-4" }),
                    "Uniform Size ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { onValueChange: field.onChange, value: field.value, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select size" }) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: UNIFORM_SIZES.map((size) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: size.value, children: size.label }, size.value)) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                control: form.control,
                name: "requestedTeam",
                render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: isReturningPlayer ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    "Team from Fall 2025 ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ] }) : "Requested Team (optional)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      placeholder: isReturningPlayer ? "Enter your team name from Fall 2025" : "Team name or coach name",
                      ...field
                    }
                  ) }),
                  isReturningPlayer && /* @__PURE__ */ jsxRuntimeExports.jsx(FormDescription, { children: "Required for returning players to ensure proper team placement" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                ] })
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold", children: "Mailing Address" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid gap-6 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            FormField,
            {
              control: form.control,
              name: "streetAddress",
              render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(FormLabel, { children: [
                  "Street Address ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "123 Main Street", ...field }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
              ] })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FormField,
            {
              control: form.control,
              name: "city",
              render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(FormLabel, { children: [
                  "City ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Keystone Heights", ...field }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                control: form.control,
                name: "state",
                render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(FormLabel, { children: [
                    "State ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "FL", ...field }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                control: form.control,
                name: "zipCode",
                render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(FormLabel, { children: [
                    "Zip Code ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "32656", ...field }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                ] })
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-5 w-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold", children: "Volunteer Opportunities" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Help make our program great! Consider volunteering this season." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          FormField,
          {
            control: form.control,
            name: "volunteerRole",
            render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { onValueChange: field.onChange, value: field.value, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a volunteer role (optional)" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: VOLUNTEER_ROLES.map((role) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: role.value, children: role.label }, role.value)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
            ] })
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-5 w-5 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold", children: "Additional Players" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: handleAddPlayer,
                disabled: additionalPlayerCount >= 5,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
                  "Add Player"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Register siblings or additional players (Returning: $",
            RETURNING_PLAYER_FEE,
            " | New: $",
            NEW_PLAYER_FEE,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6", children: [
          additionalPlayerCount === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-4", children: 'No additional players added. Click "Add Player" to register more players.' }),
          Array.from({ length: additionalPlayerCount }).map((_, index) => {
            const additionalPlayerReturning = watchedValues.additionalPlayers?.[index]?.isReturningPlayer;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border p-4 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-medium", children: [
                  "Additional Player ",
                  index + 1
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onClick: () => handleRemovePlayer(index),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "mr-2 h-4 w-4" }),
                      "Remove"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FormField,
                {
                  control: form.control,
                  name: `additionalPlayers.${index}.isReturningPlayer`,
                  render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { className: "flex flex-row items-center space-x-3 space-y-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: field.value, onCheckedChange: field.onChange }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(FormLabel, { className: "text-sm font-normal", children: [
                      "Returning Player from Fall 2025 ($",
                      RETURNING_PLAYER_FEE,
                      ")"
                    ] })
                  ] })
                }
              ),
              additionalPlayerReturning && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 p-3 text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-amber-700 dark:text-amber-300", children: "Player must use their uniform from Fall 2025 season." }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FormField,
                  {
                    control: form.control,
                    name: `additionalPlayers.${index}.firstName`,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(FormLabel, { children: [
                        "First Name ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Enter first name", ...field }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FormField,
                  {
                    control: form.control,
                    name: `additionalPlayers.${index}.lastName`,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(FormLabel, { children: [
                        "Last Name ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Enter last name", ...field }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FormField,
                  {
                    control: form.control,
                    name: `additionalPlayers.${index}.gender`,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(FormLabel, { children: [
                        "Gender ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { onValueChange: field.onChange, value: field.value, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select gender" }) }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "male", children: "Male" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "female", children: "Female" })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FormField,
                  {
                    control: form.control,
                    name: `additionalPlayers.${index}.dateOfBirth`,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(FormLabel, { children: [
                        "Date of Birth ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", ...field }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FormField,
                  {
                    control: form.control,
                    name: `additionalPlayers.${index}.uniformSize`,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(FormLabel, { children: [
                        "Uniform Size ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { onValueChange: field.onChange, value: field.value, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select size" }) }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: UNIFORM_SIZES.map((size) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: size.value, children: size.label }, size.value)) })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FormField,
                  {
                    control: form.control,
                    name: `additionalPlayers.${index}.requestedTeam`,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: additionalPlayerReturning ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        "Team from Fall 2025 ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ] }) : "Requested Team (optional)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          placeholder: additionalPlayerReturning ? "Enter team name from Fall 2025" : "Team name or coach name",
                          ...field
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                    ] })
                  }
                )
              ] })
            ] }, index);
          })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-5 w-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold", children: "Additional Comments" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Leave any notes or special requests for our team (optional)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          FormField,
          {
            control: form.control,
            name: "comments",
            render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  placeholder: "Any special requests, medical notes, or other information you'd like us to know...",
                  className: "min-h-[100px]",
                  ...field
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
            ] })
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold", children: "Terms & Conditions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-muted/30 p-4 max-h-64 overflow-y-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-2", children: "Informed Consent, Liability Waiver & Insurance Notice" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "[PLACEHOLDER - LEGAL DISCLAIMER]" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "This section will contain the official informed consent, liability waiver, and insurance notice from the Keystone Youth Soccer Club legal team." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "By checking the box below and signing, you acknowledge that you have read, understand, and agree to all terms and conditions, including but not limited to:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-1 ml-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Assumption of risk for participation in soccer activities" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Release and waiver of liability" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Consent for emergency medical treatment" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Photo/video release for promotional purposes" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Agreement to follow all club rules and regulations" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Understanding of refund and cancellation policies" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "italic", children: "[Full legal language to be provided by legal team]" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FormField,
            {
              control: form.control,
              name: "agreeToTerms",
              render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { className: "flex flex-row items-start space-x-3 space-y-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: field.value, onCheckedChange: field.onChange }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 leading-none", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(FormLabel, { children: [
                    "I have read and agree to the terms and conditions, liability waiver, and informed consent above. ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                ] })
              ] })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold", children: "Parent/Guardian Signature" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "As the parent or legal guardian, your signature is required to complete registration" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          FormField,
          {
            control: form.control,
            name: "signature",
            render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                SignatureCapture,
                {
                  value: field.value,
                  onChange: field.onChange,
                  signerName: watchedValues.parentGuardianName || "",
                  error: form.formState.errors.signature?.message
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
            ] })
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        SpamProtection,
        {
          onVerified: handleSpamVerified,
          error: !isSpamVerified && form.formState.isSubmitted ? "Please complete the verification" : void 0
        }
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "bg-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold", children: "Order Summary" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Primary Player (",
                isReturningPlayer ? "Returning" : "New",
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "$",
                getPrimaryPlayerFee().toFixed(2)
              ] })
            ] }),
            watchedValues.additionalPlayers?.map((player, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Additional Player ",
                index + 1,
                " (",
                player.isReturningPlayer ? "Returning" : "New",
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "$",
                (player.isReturningPlayer ? RETURNING_PLAYER_FEE : NEW_PLAYER_FEE).toFixed(2)
              ] })
            ] }, index)),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t pt-2 mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-lg font-bold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total Due" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
                "$",
                totalPrice.toFixed(2)
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Payment will be processed securely through Authorize.net. You will be redirected to complete payment after submitting this form." }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              size: "lg",
              className: "w-full",
              disabled: isSubmitting || !isSpamVerified,
              children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-spin mr-2", children: "⏳" }),
                "Processing..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "mr-2 h-5 w-5" }),
                "Proceed to Payment - $",
                totalPrice.toFixed(2)
              ] })
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
const seasonQueryOptions = (seasonId) => queryOptions({
  queryKey: ["season", "registration", seasonId],
  queryFn: () => getSeasonForRegistration({
    data: {
      seasonId
    }
  }),
  staleTime: 1e3 * 60 * 5
  // 5 minutes
});
function RouteComponent() {
  const navigate = useNavigate();
  const {
    seasonId
  } = Route$s.useParams();
  const {
    data
  } = useSuspenseQuery(seasonQueryOptions(seasonId));
  if (data.error || !data.season) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto max-w-2xl px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-destructive", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-destructive", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-6 w-6" }),
        "Season Not Found"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "The season you're looking for doesn't exist or is no longer available." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate({
          to: "/register"
        }), children: "View Available Seasons" })
      ] })
    ] }) });
  }
  const {
    season,
    registrationStatus
  } = data;
  if (registrationStatus.notYetOpen) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto max-w-2xl px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-6 w-6 text-blue-500" }),
        "Registration Opens Soon"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
          "Registration for ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: season.name }),
          " hasn't opened yet."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-muted p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "mr-2 inline h-4 w-4" }),
          "Registration opens: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formatDate(season.registrationOpenDate) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => navigate({
          to: "/register"
        }), children: "View Other Seasons" })
      ] })
    ] }) });
  }
  if (registrationStatus.isClosed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto max-w-2xl px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-orange-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-orange-600", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-6 w-6" }),
        "Registration Closed"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
          "Registration for ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: season.name }),
          " has ended."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-muted p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
          "Registration closed on: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formatDate(season.registrationCloseDate) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Please contact us if you have questions or need assistance." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => navigate({
          to: "/register"
        }), children: "View Other Seasons" })
      ] })
    ] }) });
  }
  if (!registrationStatus.isOpen && !registrationStatus.isLate) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto max-w-2xl px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-6 w-6 text-yellow-500" }),
        "Registration Temporarily Unavailable"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
          "Registration for ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: season.name }),
          " is currently unavailable. Please check back later or contact us for more information."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => navigate({
          to: "/register"
        }), children: "View Other Seasons" })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    registrationStatus.isLate && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-orange-50 border-b border-orange-200 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-orange-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "mr-2 inline h-4 w-4" }),
      "Late registration - A $",
      season.lateFee.toFixed(2),
      " late fee has been added."
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SinglePageRegistration, { seasonId: season.id, seasonName: season.name, baseRegistrationFee: registrationStatus.totalFee, onSuccess: (registrationData) => {
      console.log("Registration successful:", registrationData);
      navigate({
        to: "/register/success",
        search: {
          confirmationNumber: registrationData.confirmationNumber
        }
      });
    } })
  ] });
}
function formatDate(dateString) {
  const date = /* @__PURE__ */ new Date(dateString + "T00:00:00");
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}
export {
  RouteComponent as component
};
