import * as React from 'react';

import {
  WebShareConfig,
  WebShareConfigContainer,
  WebShareInterface,
} from './types';

export const share = (config: WebShareConfig) => () =>
  (navigator as any)
    .share(config.params)
    .then(config.onShareSuccess)
    .catch(config.onShareError);

const WebShare = <TProps extends object>() => (
  WrappedComponent:
    | React.ClassType<TProps & WebShareInterface, any, any>
    | React.SFC<TProps & WebShareInterface>,
): React.ClassType<TProps & WebShareConfigContainer, any, any> =>
  class ExtendedComponent extends React.Component<
    TProps & WebShareConfigContainer,
    void
  > {
    render():
      | React.ClassType<TProps & WebShareInterface, any, any>
      | React.SFC<TProps & WebShareInterface> {
      const { config, ...passedProps } = this.props as any;
      const isSupported = (navigator as any).share !== undefined;
      const supportedProps =
        isSupported && config
          ? { isSupported, share: share(config) }
          : { isSupported };

      return <WrappedComponent {...passedProps} {...supportedProps} />;
    }
  };

export default WebShare;
