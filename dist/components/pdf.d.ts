import React, { PureComponent } from 'react';
export declare class Pdf extends PureComponent<any> {
    targetRef: React.RefObject<unknown>;
    constructor(props: any);
    toPdf(): Promise<void>;
    render(): any;
}
