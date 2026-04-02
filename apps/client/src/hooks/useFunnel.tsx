import React, { useState, ReactElement, useMemo } from 'react';

interface StepProps {
  name: string;
  children: React.ReactNode;
}

interface FunnelProps {
  children: ReactElement<StepProps>[];
}

type FunnelComponent = React.FC<FunnelProps> & {
  Step: React.FC<StepProps>;
};

export function useFunnel<T extends string>(_steps: T[], initialStep: T) {
  const [step, setStep] = useState<T>(initialStep);

  const Step = React.memo(({ children }: StepProps) => {
    return <>{children}</>;
  });
  Step.displayName = 'Step';

  const Funnel: FunnelComponent = useMemo(() => {
    type FunnelComponentWithStep = React.FC<FunnelProps> & { Step: React.FC<StepProps> };

    const FunnelComponent: FunnelComponentWithStep = ({ children }) => {
      const targetStep = children.find(childStep => childStep.props.name === step);
      return targetStep || null;
    };
    FunnelComponent.Step = Step;
    return FunnelComponent as FunnelComponentWithStep;
  }, [step]);

  return [Funnel, setStep, step] as const;
}
