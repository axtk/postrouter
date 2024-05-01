import {useContext, useCallback, createElement, AnchorHTMLAttributes, MouseEvent} from 'react';
import {isRouteEvent} from '../lib/isRouteEvent';
import {RouteContext} from './RouteContext';

export const A = ({href, target, onClick, ...rest}: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    let route = useContext(RouteContext);

    let handleClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
        if (onClick)
            onClick(event);

        if (!event.defaultPrevented && isRouteEvent(event, {href, target})) {
            event.preventDefault();
            route.assign(href);
        }
    }, [route, href, target, onClick]);

    return createElement('a', {href, target, onClick: handleClick, ...rest});
};
