import { ComponentType, ReactFragment, ReactNode } from 'react';
export declare type AnyComponent<T> = ComponentType<T> | ((props: T) => ReactNode);
export declare type LooseAnyComponent<T> = ComponentType<T> | ((props: T) => Exclude<ReactNode, ReactFragment | undefined>);
//# sourceMappingURL=any-component.d.ts.map