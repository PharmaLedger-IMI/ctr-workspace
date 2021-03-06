/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface BarcodeGenerator {
        "data": any;
        /**
          * description: `This option allows to print the input data below the generated barcode.`, isMandatory: false, propertyType: `boolean`
         */
        "includeText": boolean;
        "scale"?: any;
        /**
          * description: `The size of the barcode in mm. Default is set to 32 mm.`, isMandatory: false, propertyType: `integer`
         */
        "size"?: any;
        /**
          * description: `A title that will be used for the current component instance.`, isMandatory: false, propertyType: `string`
         */
        "title": string;
        /**
          * description: `The barcode type. Accepted values are 'gs1datamatrix','datamatrix','qrcode', 'code128','code11','isbn'.`, isMandatory: true, propertyType: `string`
         */
        "type": string;
    }
    interface BatchChip {
        "expiryThreshold"?: number;
        "gtinBatch": string;
        "loaderType"?: string;
        "mode"?: string;
        "quantity"?: number;
    }
    interface BatchListItem {
    }
    interface ManagedBatchListItem {
        "gtinBatch": string;
        "refresh": () => Promise<void>;
    }
    interface ManagedProductListItem {
        "gtin": string;
        "refresh": () => Promise<void>;
    }
    interface ManagedReceivedOrderListItem {
        "orderId": string;
        "refresh": () => Promise<void>;
    }
    interface MenuTabButton {
        "iconName"?: string;
        "label"?: string;
        "mode"?: string;
        "tab": string;
    }
    interface MultiSpinner {
        "type"?: string;
    }
    interface PdmIonTable {
        "buttons"?: string[];
        /**
          * Shows the search bar or not. (not working)
         */
        "canQuery"?: boolean;
        "currentPage"?: number;
        "iconName"?: string;
        /**
          * if the {@link PdmIonTable} is set to mode:  - {@link ION_TABLE_MODES.BY_REF}: must be the querying attribute name so the items can query their own value  - {@link ION_TABLE_MODES.BY_MODEL}: must be the model chain for content list
         */
        "itemReference": string;
        /**
          * The tag for the item type that the table should use eg: 'li' would create list items
         */
        "itemType": string;
        "itemsPerPage"?: number;
        "loadingMessage": string;
        /**
          * sets the name of the manager to use Only required if mode if {@link PdmIonTable#mode} is set to {@link ION_TABLE_MODES.BY_REF}
         */
        "manager"?: string;
        /**
          * can be any of {@link ION_TABLE_MODES} Decides if the tables works by:  - {@link ION_TABLE_MODES.BY_MODEL}: uses the WebCardinal model api
         */
        "mode": string;
        "noContentMessage": string;
        "pageCount"?: number;
        "paginated"?: boolean;
        /**
          * Querying/paginating Params - only available when mode is set by ref
         */
        "query"?: string;
        "refresh": () => Promise<void>;
        "sort"?: string;
        /**
          * Graphical Params
         */
        "title": string;
    }
    interface PdmSsappLoader {
        "loader"?: string;
        "markAsLoaded": (evt: any) => Promise<void>;
        "timeout"?: number;
        "updateStatus": (evt: any) => Promise<void>;
    }
    interface ProductListItem {
    }
    interface StockListItem {
    }
}
declare global {
    interface HTMLBarcodeGeneratorElement extends Components.BarcodeGenerator, HTMLStencilElement {
    }
    var HTMLBarcodeGeneratorElement: {
        prototype: HTMLBarcodeGeneratorElement;
        new (): HTMLBarcodeGeneratorElement;
    };
    interface HTMLBatchChipElement extends Components.BatchChip, HTMLStencilElement {
    }
    var HTMLBatchChipElement: {
        prototype: HTMLBatchChipElement;
        new (): HTMLBatchChipElement;
    };
    interface HTMLBatchListItemElement extends Components.BatchListItem, HTMLStencilElement {
    }
    var HTMLBatchListItemElement: {
        prototype: HTMLBatchListItemElement;
        new (): HTMLBatchListItemElement;
    };
    interface HTMLManagedBatchListItemElement extends Components.ManagedBatchListItem, HTMLStencilElement {
    }
    var HTMLManagedBatchListItemElement: {
        prototype: HTMLManagedBatchListItemElement;
        new (): HTMLManagedBatchListItemElement;
    };
    interface HTMLManagedProductListItemElement extends Components.ManagedProductListItem, HTMLStencilElement {
    }
    var HTMLManagedProductListItemElement: {
        prototype: HTMLManagedProductListItemElement;
        new (): HTMLManagedProductListItemElement;
    };
    interface HTMLManagedReceivedOrderListItemElement extends Components.ManagedReceivedOrderListItem, HTMLStencilElement {
    }
    var HTMLManagedReceivedOrderListItemElement: {
        prototype: HTMLManagedReceivedOrderListItemElement;
        new (): HTMLManagedReceivedOrderListItemElement;
    };
    interface HTMLMenuTabButtonElement extends Components.MenuTabButton, HTMLStencilElement {
    }
    var HTMLMenuTabButtonElement: {
        prototype: HTMLMenuTabButtonElement;
        new (): HTMLMenuTabButtonElement;
    };
    interface HTMLMultiSpinnerElement extends Components.MultiSpinner, HTMLStencilElement {
    }
    var HTMLMultiSpinnerElement: {
        prototype: HTMLMultiSpinnerElement;
        new (): HTMLMultiSpinnerElement;
    };
    interface HTMLPdmIonTableElement extends Components.PdmIonTable, HTMLStencilElement {
    }
    var HTMLPdmIonTableElement: {
        prototype: HTMLPdmIonTableElement;
        new (): HTMLPdmIonTableElement;
    };
    interface HTMLPdmSsappLoaderElement extends Components.PdmSsappLoader, HTMLStencilElement {
    }
    var HTMLPdmSsappLoaderElement: {
        prototype: HTMLPdmSsappLoaderElement;
        new (): HTMLPdmSsappLoaderElement;
    };
    interface HTMLProductListItemElement extends Components.ProductListItem, HTMLStencilElement {
    }
    var HTMLProductListItemElement: {
        prototype: HTMLProductListItemElement;
        new (): HTMLProductListItemElement;
    };
    interface HTMLStockListItemElement extends Components.StockListItem, HTMLStencilElement {
    }
    var HTMLStockListItemElement: {
        prototype: HTMLStockListItemElement;
        new (): HTMLStockListItemElement;
    };
    interface HTMLElementTagNameMap {
        "barcode-generator": HTMLBarcodeGeneratorElement;
        "batch-chip": HTMLBatchChipElement;
        "batch-list-item": HTMLBatchListItemElement;
        "managed-batch-list-item": HTMLManagedBatchListItemElement;
        "managed-product-list-item": HTMLManagedProductListItemElement;
        "managed-received-order-list-item": HTMLManagedReceivedOrderListItemElement;
        "menu-tab-button": HTMLMenuTabButtonElement;
        "multi-spinner": HTMLMultiSpinnerElement;
        "pdm-ion-table": HTMLPdmIonTableElement;
        "pdm-ssapp-loader": HTMLPdmSsappLoaderElement;
        "product-list-item": HTMLProductListItemElement;
        "stock-list-item": HTMLStockListItemElement;
    }
}
declare namespace LocalJSX {
    interface BarcodeGenerator {
        "data"?: any;
        /**
          * description: `This option allows to print the input data below the generated barcode.`, isMandatory: false, propertyType: `boolean`
         */
        "includeText"?: boolean;
        "scale"?: any;
        /**
          * description: `The size of the barcode in mm. Default is set to 32 mm.`, isMandatory: false, propertyType: `integer`
         */
        "size"?: any;
        /**
          * description: `A title that will be used for the current component instance.`, isMandatory: false, propertyType: `string`
         */
        "title"?: string;
        /**
          * description: `The barcode type. Accepted values are 'gs1datamatrix','datamatrix','qrcode', 'code128','code11','isbn'.`, isMandatory: true, propertyType: `string`
         */
        "type"?: string;
    }
    interface BatchChip {
        "expiryThreshold"?: number;
        "gtinBatch"?: string;
        "loaderType"?: string;
        "mode"?: string;
        "quantity"?: number;
    }
    interface BatchListItem {
        /**
          * Through this event model is received (from webc-container, webc-for, webc-if or any component that supports a controller).
         */
        "onWebcardinal:model:get"?: (event: CustomEvent<any>) => void;
    }
    interface ManagedBatchListItem {
        "gtinBatch"?: string;
        /**
          * Through this event errors are passed
         */
        "onSendErrorEvent"?: (event: CustomEvent<any>) => void;
    }
    interface ManagedProductListItem {
        "gtin"?: string;
        /**
          * Through this event errors are passed
         */
        "onSendErrorEvent"?: (event: CustomEvent<any>) => void;
        /**
          * Through this event navigation requests to tabs are made
         */
        "onSsapp-navigate-tab"?: (event: CustomEvent<any>) => void;
    }
    interface ManagedReceivedOrderListItem {
        /**
          * Through this event errors are passed
         */
        "onSendErrorEvent"?: (event: CustomEvent<any>) => void;
        "orderId"?: string;
    }
    interface MenuTabButton {
        "iconName"?: string;
        "label"?: string;
        "mode"?: string;
        /**
          * Through this event navigation requests to tabs are made
         */
        "onSsapp-navigate-tab"?: (event: CustomEvent<any>) => void;
        "tab"?: string;
    }
    interface MultiSpinner {
        "type"?: string;
    }
    interface PdmIonTable {
        "buttons"?: string[];
        /**
          * Shows the search bar or not. (not working)
         */
        "canQuery"?: boolean;
        "currentPage"?: number;
        "iconName"?: string;
        /**
          * if the {@link PdmIonTable} is set to mode:  - {@link ION_TABLE_MODES.BY_REF}: must be the querying attribute name so the items can query their own value  - {@link ION_TABLE_MODES.BY_MODEL}: must be the model chain for content list
         */
        "itemReference"?: string;
        /**
          * The tag for the item type that the table should use eg: 'li' would create list items
         */
        "itemType"?: string;
        "itemsPerPage"?: number;
        "loadingMessage"?: string;
        /**
          * sets the name of the manager to use Only required if mode if {@link PdmIonTable#mode} is set to {@link ION_TABLE_MODES.BY_REF}
         */
        "manager"?: string;
        /**
          * can be any of {@link ION_TABLE_MODES} Decides if the tables works by:  - {@link ION_TABLE_MODES.BY_MODEL}: uses the WebCardinal model api
         */
        "mode"?: string;
        "noContentMessage"?: string;
        /**
          * Through this event model is received (from webc-container, webc-for, webc-if or any component that supports a controller).
         */
        "onGetModelEvent"?: (event: CustomEvent<any>) => void;
        /**
          * Through this event errors are passed
         */
        "onSendErrorEvent"?: (event: CustomEvent<any>) => void;
        "pageCount"?: number;
        "paginated"?: boolean;
        /**
          * Querying/paginating Params - only available when mode is set by ref
         */
        "query"?: string;
        "sort"?: string;
        /**
          * Graphical Params
         */
        "title"?: string;
    }
    interface PdmSsappLoader {
        "loader"?: string;
        "timeout"?: number;
    }
    interface ProductListItem {
        /**
          * Through this event model is received (from webc-container, webc-for, webc-if or any component that supports a controller).
         */
        "onWebcardinal:model:get"?: (event: CustomEvent<any>) => void;
    }
    interface StockListItem {
        /**
          * Through this event model is received (from webc-container, webc-for, webc-if or any component that supports a controller).
         */
        "onWebcardinal:model:get"?: (event: CustomEvent<any>) => void;
    }
    interface IntrinsicElements {
        "barcode-generator": BarcodeGenerator;
        "batch-chip": BatchChip;
        "batch-list-item": BatchListItem;
        "managed-batch-list-item": ManagedBatchListItem;
        "managed-product-list-item": ManagedProductListItem;
        "managed-received-order-list-item": ManagedReceivedOrderListItem;
        "menu-tab-button": MenuTabButton;
        "multi-spinner": MultiSpinner;
        "pdm-ion-table": PdmIonTable;
        "pdm-ssapp-loader": PdmSsappLoader;
        "product-list-item": ProductListItem;
        "stock-list-item": StockListItem;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "barcode-generator": LocalJSX.BarcodeGenerator & JSXBase.HTMLAttributes<HTMLBarcodeGeneratorElement>;
            "batch-chip": LocalJSX.BatchChip & JSXBase.HTMLAttributes<HTMLBatchChipElement>;
            "batch-list-item": LocalJSX.BatchListItem & JSXBase.HTMLAttributes<HTMLBatchListItemElement>;
            "managed-batch-list-item": LocalJSX.ManagedBatchListItem & JSXBase.HTMLAttributes<HTMLManagedBatchListItemElement>;
            "managed-product-list-item": LocalJSX.ManagedProductListItem & JSXBase.HTMLAttributes<HTMLManagedProductListItemElement>;
            "managed-received-order-list-item": LocalJSX.ManagedReceivedOrderListItem & JSXBase.HTMLAttributes<HTMLManagedReceivedOrderListItemElement>;
            "menu-tab-button": LocalJSX.MenuTabButton & JSXBase.HTMLAttributes<HTMLMenuTabButtonElement>;
            "multi-spinner": LocalJSX.MultiSpinner & JSXBase.HTMLAttributes<HTMLMultiSpinnerElement>;
            "pdm-ion-table": LocalJSX.PdmIonTable & JSXBase.HTMLAttributes<HTMLPdmIonTableElement>;
            "pdm-ssapp-loader": LocalJSX.PdmSsappLoader & JSXBase.HTMLAttributes<HTMLPdmSsappLoaderElement>;
            "product-list-item": LocalJSX.ProductListItem & JSXBase.HTMLAttributes<HTMLProductListItemElement>;
            "stock-list-item": LocalJSX.StockListItem & JSXBase.HTMLAttributes<HTMLStockListItemElement>;
        }
    }
}
