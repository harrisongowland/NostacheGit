import { FC, PropsWithChildren } from 'react';
import { SequenceProps } from '../sequencing';
declare type SeriesSequenceProps = PropsWithChildren<{
    durationInFrames: number;
    offset?: number;
} & Pick<SequenceProps, 'layout' | 'name'>>;
declare const SeriesSequence: ({ children }: SeriesSequenceProps) => JSX.Element;
declare const Series: FC & {
    Sequence: typeof SeriesSequence;
};
export { Series };
//# sourceMappingURL=index.d.ts.map