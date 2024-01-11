import { Children, ReactNode } from "react";

interface EachProps<T> {
  of: T[];
  render: (item: T, index: number) => ReactNode;
}

export const Each = <T>({ render, of }: EachProps<T>) =>
  Children.toArray(of.map((item, index) => render(item, index)));
