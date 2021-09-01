import { ReactChild, ReactChildren, ReactElement } from 'react';

export const Switch = (props: any) => {
  const { test, children } = props;
  return children.find((child: ReactElement) => {
    return child.props.value === test;
  });
};
