import { Configuration } from 'webpack';
export declare type WebpackConfiguration = Configuration & {
    devServer: {
        contentBase: string;
        historyApiFallback: boolean;
        hot: true;
    };
};
export declare type WebpackOverrideFn = (currentConfiguration: WebpackConfiguration) => WebpackConfiguration;
export declare const defaultOverrideFunction: WebpackOverrideFn;
export declare const getWebpackOverrideFn: () => WebpackOverrideFn;
export declare const overrideWebpackConfig: (fn: WebpackOverrideFn) => void;
//# sourceMappingURL=override-webpack.d.ts.map