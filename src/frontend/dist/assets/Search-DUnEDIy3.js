import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, P as Presence, f as Primitive, g as useControllableState, h as useComposedRefs, i as composeEventHandlers, k as useSize, l as createContextScope, m as cn, n as useDirection, R as Root, I as Item, o as createRovingFocusGroupScope, A as AssetType, V as Variant_square_portrait_landscape, S as SortOrder, C as ChevronDown, p as useSearch, u as useNavigate, b as SearchBar, X, q as Sheet, s as SheetTrigger, d as Button, t as SheetContent, v as SheetHeader, w as SheetTitle } from "./index-AQ6D2SeO.js";
import { A as AssetCardSkeleton, a as AssetCard } from "./AssetCard-Bbf6OJQ7.js";
import { L as Label } from "./label-Bb9ihSlX.js";
import { S as Separator } from "./separator-0Tz6cZ3_.js";
import { a as useSearchAssets, u as useListAssets } from "./use-assets-CQ5C3UmW.js";
import "./index-CBlFNOWN.js";
import "./download-AKDWoY1f.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
function usePrevious(value) {
  const ref = reactExports.useRef({ value, previous: value });
  return reactExports.useMemo(() => {
    if (ref.current.value !== value) {
      ref.current.previous = ref.current.value;
      ref.current.value = value;
    }
    return ref.current.previous;
  }, [value]);
}
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
      const form = control == null ? void 0 : control.form;
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
        "data-state": getState$1(checked),
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
var INDICATOR_NAME$1 = "CheckboxIndicator";
var CheckboxIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME$1, __scopeCheckbox);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Presence,
      {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            "data-state": getState$1(context.checked),
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
CheckboxIndicator.displayName = INDICATOR_NAME$1;
var BUBBLE_INPUT_NAME$1 = "CheckboxBubbleInput";
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
    } = useCheckboxContext(BUBBLE_INPUT_NAME$1, __scopeCheckbox);
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
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME$1;
function isFunction(value) {
  return typeof value === "function";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState$1(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Checkbox$1,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckboxIndicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" })
        }
      )
    }
  );
}
var RADIO_NAME = "Radio";
var [createRadioContext, createRadioScope] = createContextScope(RADIO_NAME);
var [RadioProvider, useRadioContext] = createRadioContext(RADIO_NAME);
var Radio = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRadio,
      name,
      checked = false,
      required,
      disabled,
      value = "on",
      onCheck,
      form,
      ...radioProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(RadioProvider, { scope: __scopeRadio, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "radio",
          "aria-checked": checked,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...radioProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            if (!checked) onCheck == null ? void 0 : onCheck();
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        RadioBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Radio.displayName = RADIO_NAME;
var INDICATOR_NAME = "RadioIndicator";
var RadioIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeRadio, forceMount, ...indicatorProps } = props;
    const context = useRadioContext(INDICATOR_NAME, __scopeRadio);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.checked, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...indicatorProps,
        ref: forwardedRef
      }
    ) });
  }
);
RadioIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "RadioBubbleInput";
var RadioBubbleInput = reactExports.forwardRef(
  ({
    __scopeRadio,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "radio",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
RadioBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
var RADIO_GROUP_NAME = "RadioGroup";
var [createRadioGroupContext] = createContextScope(RADIO_GROUP_NAME, [
  createRovingFocusGroupScope,
  createRadioScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var useRadioScope = createRadioScope();
var [RadioGroupProvider, useRadioGroupContext] = createRadioGroupContext(RADIO_GROUP_NAME);
var RadioGroup$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRadioGroup,
      name,
      defaultValue,
      value: valueProp,
      required = false,
      disabled = false,
      orientation,
      dir,
      loop = true,
      onValueChange,
      ...groupProps
    } = props;
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup);
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue ?? null,
      onChange: onValueChange,
      caller: RADIO_GROUP_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      RadioGroupProvider,
      {
        scope: __scopeRadioGroup,
        name,
        required,
        disabled,
        value,
        onValueChange: setValue,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Root,
          {
            asChild: true,
            ...rovingFocusGroupScope,
            orientation,
            dir: direction,
            loop,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Primitive.div,
              {
                role: "radiogroup",
                "aria-required": required,
                "aria-orientation": orientation,
                "data-disabled": disabled ? "" : void 0,
                dir: direction,
                ...groupProps,
                ref: forwardedRef
              }
            )
          }
        )
      }
    );
  }
);
RadioGroup$1.displayName = RADIO_GROUP_NAME;
var ITEM_NAME = "RadioGroupItem";
var RadioGroupItem$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeRadioGroup, disabled, ...itemProps } = props;
    const context = useRadioGroupContext(ITEM_NAME, __scopeRadioGroup);
    const isDisabled = context.disabled || disabled;
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup);
    const radioScope = useRadioScope(__scopeRadioGroup);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const checked = context.value === itemProps.value;
    const isArrowKeyPressedRef = reactExports.useRef(false);
    reactExports.useEffect(() => {
      const handleKeyDown = (event) => {
        if (ARROW_KEYS.includes(event.key)) {
          isArrowKeyPressedRef.current = true;
        }
      };
      const handleKeyUp = () => isArrowKeyPressedRef.current = false;
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
      };
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !isDisabled,
        active: checked,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Radio,
          {
            disabled: isDisabled,
            required: context.required,
            checked,
            ...radioScope,
            ...itemProps,
            name: context.name,
            ref: composedRefs,
            onCheck: () => context.onValueChange(itemProps.value),
            onKeyDown: composeEventHandlers((event) => {
              if (event.key === "Enter") event.preventDefault();
            }),
            onFocus: composeEventHandlers(itemProps.onFocus, () => {
              var _a;
              if (isArrowKeyPressedRef.current) (_a = ref.current) == null ? void 0 : _a.click();
            })
          }
        )
      }
    );
  }
);
RadioGroupItem$1.displayName = ITEM_NAME;
var INDICATOR_NAME2 = "RadioGroupIndicator";
var RadioGroupIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeRadioGroup, ...indicatorProps } = props;
    const radioScope = useRadioScope(__scopeRadioGroup);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(RadioIndicator, { ...radioScope, ...indicatorProps, ref: forwardedRef });
  }
);
RadioGroupIndicator.displayName = INDICATOR_NAME2;
var Root2 = RadioGroup$1;
var Item2 = RadioGroupItem$1;
var Indicator = RadioGroupIndicator;
function RadioGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "radio-group",
      className: cn("grid gap-3", className),
      ...props
    }
  );
}
function RadioGroupItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Item2,
    {
      "data-slot": "radio-group-item",
      className: cn(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "relative flex items-center justify-center",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" })
        }
      )
    }
  );
}
const ASSET_TYPES = [
  { value: AssetType.vector, label: "Vectors" },
  { value: AssetType.photo, label: "Photos" },
  { value: AssetType.illustration, label: "Illustrations" },
  { value: AssetType.icon, label: "Icons" },
  { value: AssetType.template, label: "Templates" },
  { value: AssetType.threeD, label: "3D Assets" },
  { value: AssetType.font, label: "Fonts" }
];
const CATEGORIES = [
  "Business",
  "Technology",
  "Nature",
  "People",
  "Abstract",
  "Architecture",
  "Food",
  "Travel",
  "Fashion",
  "Medical"
];
const ORIENTATIONS = [
  { value: Variant_square_portrait_landscape.landscape, label: "Horizontal" },
  { value: Variant_square_portrait_landscape.portrait, label: "Vertical" },
  { value: Variant_square_portrait_landscape.square, label: "Square" }
];
const SORT_OPTIONS = [
  { value: SortOrder.relevance, label: "Relevance" },
  { value: SortOrder.newest, label: "Newest" },
  { value: SortOrder.mostDownloaded, label: "Most Downloaded" }
];
function FilterSection({
  title,
  children,
  defaultOpen = true
}) {
  const [isOpen, setIsOpen] = reactExports.useState(defaultOpen);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setIsOpen((o) => !o),
        className: "flex w-full items-center justify-between py-3 text-sm font-semibold text-foreground",
        "data-ocid": "filter-section-toggle",
        "aria-expanded": isOpen,
        children: [
          title,
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChevronDown,
            {
              className: `h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`
            }
          )
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-3 space-y-2", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {})
  ] });
}
function FilterSidebar({ filters, onChange }) {
  const toggleAssetType = (type) => {
    const current = filters.assetTypes;
    const next = current.includes(type) ? current.filter((t) => t !== type) : [...current, type];
    onChange({ ...filters, assetTypes: next });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "w-full space-y-0", "data-ocid": "filter-sidebar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FilterSection, { title: "Asset Type", children: ASSET_TYPES.map(({ value, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Checkbox,
        {
          id: `type-${value}`,
          checked: filters.assetTypes.includes(value),
          onCheckedChange: () => toggleAssetType(value),
          "data-ocid": `filter-type-${value}`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Label,
        {
          htmlFor: `type-${value}`,
          className: "text-sm cursor-pointer text-foreground/80",
          children: label
        }
      )
    ] }, value)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FilterSection, { title: "Category", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5 max-h-48 overflow-y-auto pr-1", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => onChange({
          ...filters,
          category: filters.category === cat ? void 0 : cat
        }),
        className: `block w-full text-left text-sm px-2 py-1 rounded-md transition-smooth ${filters.category === cat ? "bg-primary/10 text-primary font-medium" : "text-foreground/70 hover:bg-muted hover:text-foreground"}`,
        "data-ocid": `filter-category-${cat.toLowerCase()}`,
        children: cat
      },
      cat
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FilterSection, { title: "License", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      RadioGroup,
      {
        value: filters.licenseType ?? "all",
        onValueChange: (v) => onChange({
          ...filters,
          licenseType: v === "all" ? void 0 : v
        }),
        "data-ocid": "filter-license",
        children: [
          { value: "all", label: "All" },
          { value: "free", label: "Free" },
          { value: "premium", label: "Premium" }
        ].map(({ value, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value, id: `license-${value}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: `license-${value}`,
              className: "text-sm cursor-pointer text-foreground/80",
              children: label
            }
          )
        ] }, value))
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FilterSection, { title: "Orientation", children: ORIENTATIONS.map(({ value, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Checkbox,
        {
          id: `orient-${value}`,
          checked: filters.orientation === value,
          onCheckedChange: () => onChange({
            ...filters,
            orientation: filters.orientation === value ? void 0 : value
          }),
          "data-ocid": `filter-orientation-${value}`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Label,
        {
          htmlFor: `orient-${value}`,
          className: "text-sm cursor-pointer text-foreground/80",
          children: label
        }
      )
    ] }, value)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FilterSection, { title: "Sort By", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      RadioGroup,
      {
        value: filters.sort,
        onValueChange: (v) => onChange({ ...filters, sort: v }),
        "data-ocid": "filter-sort",
        children: SORT_OPTIONS.map(({ value, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value, id: `sort-${value}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: `sort-${value}`,
              className: "text-sm cursor-pointer text-foreground/80",
              children: label
            }
          )
        ] }, value))
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => onChange({
          assetTypes: [],
          category: void 0,
          licenseType: void 0,
          orientation: void 0,
          sort: SortOrder.relevance,
          page: 1
        }),
        className: "w-full mt-2 text-sm text-muted-foreground hover:text-foreground transition-smooth underline-offset-2 hover:underline",
        "data-ocid": "filter-reset",
        children: "Reset all filters"
      }
    )
  ] });
}
const PAGE_SIZE = 20n;
const DEFAULT_FILTERS = {
  assetTypes: [],
  category: void 0,
  licenseType: void 0,
  orientation: void 0,
  sort: SortOrder.relevance,
  page: 1
};
const SKELETON_KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t"
];
function buildAssetFilter(filters) {
  return {
    tags: [],
    category: filters.category,
    assetType: filters.assetTypes.length === 1 ? filters.assetTypes[0] : void 0,
    license: void 0,
    orientation: filters.orientation
  };
}
function SearchPage() {
  var _a;
  const params = useSearch({ from: "/search" });
  const navigate = useNavigate();
  const [filters, setFilters] = reactExports.useState(() => {
    let assetTypes = [];
    let orientation = void 0;
    let licenseType = void 0;
    let sort = SortOrder.relevance;
    try {
      if (params.filters) {
        const parsed = JSON.parse(decodeURIComponent(params.filters));
        assetTypes = parsed.assetTypes ?? [];
        orientation = parsed.orientation;
        licenseType = parsed.licenseType;
        sort = parsed.sort ?? SortOrder.relevance;
      }
    } catch {
    }
    return {
      assetTypes,
      category: params.category || void 0,
      licenseType,
      orientation,
      sort,
      page: params.page ?? 1
    };
  });
  const [mobileFilterOpen, setMobileFilterOpen] = reactExports.useState(false);
  const keyword = params.q ?? "";
  const page = filters.page;
  const pageRequest = {
    offset: BigInt(page - 1) * PAGE_SIZE,
    limit: PAGE_SIZE
  };
  const isSearching = keyword.length > 0;
  const searchResult = useSearchAssets(keyword, pageRequest);
  const listResult = useListAssets(
    buildAssetFilter(filters),
    filters.sort,
    pageRequest
  );
  const { data, isLoading } = isSearching ? searchResult : listResult;
  const total = Number((data == null ? void 0 : data.total) ?? 0n);
  const totalPages = Math.ceil(total / Number(PAGE_SIZE));
  const handleSearch = (kw) => {
    navigate({
      to: "/search",
      search: { q: kw, page: 1, type: "", category: "", filters: "" }
    });
  };
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    const filtersPayload = {
      assetTypes: newFilters.assetTypes,
      orientation: newFilters.orientation,
      licenseType: newFilters.licenseType,
      sort: newFilters.sort
    };
    const hasFilters = newFilters.assetTypes.length > 0 || newFilters.orientation !== void 0 || newFilters.licenseType !== void 0 || newFilters.sort !== SortOrder.relevance;
    navigate({
      to: "/search",
      search: {
        q: keyword,
        page: newFilters.page,
        type: "",
        category: newFilters.category ?? "",
        filters: hasFilters ? encodeURIComponent(JSON.stringify(filtersPayload)) : ""
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SearchBar,
        {
          initialValue: keyword,
          size: "md",
          onSearch: handleSearch,
          className: "max-w-2xl"
        }
      ),
      keyword && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
          "Results for",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-foreground", children: [
            '"',
            keyword,
            '"'
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => navigate({
              to: "/search",
              search: {
                q: "",
                page: 1,
                type: "",
                category: "",
                filters: ""
              }
            }),
            className: "text-muted-foreground hover:text-foreground transition-smooth",
            "aria-label": "Clear search",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "aside",
        {
          className: "hidden lg:block w-56 flex-shrink-0",
          "data-ocid": "filter-sidebar-desktop",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(FilterSidebar, { filters, onChange: handleFilterChange })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: isLoading ? "Loading…" : `${total.toLocaleString()} assets` }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { open: mobileFilterOpen, onOpenChange: setMobileFilterOpen, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "lg:hidden gap-2",
                "data-ocid": "mobile-filter-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-4 w-4" }),
                  "Filters"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "left", className: "w-72 overflow-y-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { children: "Filters" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FilterSidebar,
                {
                  filters,
                  onChange: handleFilterChange
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4",
            "data-ocid": "assets-grid",
            children: isLoading ? SKELETON_KEYS.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(AssetCardSkeleton, {}, k)) : ((data == null ? void 0 : data.items) ?? []).map((asset) => /* @__PURE__ */ jsxRuntimeExports.jsx(AssetCard, { asset }, asset.id.toString()))
          }
        ),
        !isLoading && !((_a = data == null ? void 0 : data.items) == null ? void 0 : _a.length) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-24 text-muted-foreground",
            "data-ocid": "empty-state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4 opacity-20", children: "◎" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No results found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: "Try different keywords or adjust your filters." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  className: "mt-4",
                  onClick: () => handleFilterChange(DEFAULT_FILTERS),
                  "data-ocid": "reset-filters-btn",
                  children: "Reset filters"
                }
              )
            ]
          }
        ),
        totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-center gap-2 mt-10",
            "data-ocid": "pagination",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  disabled: page <= 1,
                  onClick: () => handleFilterChange({ ...filters, page: filters.page - 1 }),
                  children: "Previous"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground px-3", children: [
                "Page ",
                page,
                " of ",
                totalPages
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  disabled: page >= totalPages,
                  onClick: () => handleFilterChange({ ...filters, page: filters.page + 1 }),
                  children: "Next"
                }
              )
            ]
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  SearchPage
};
