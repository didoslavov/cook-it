import {
  trigger,
  transition,
  state,
  style,
  query,
  group,
  animate,
} from '@angular/animations';

export const fadeInAnimation = trigger('fadeInAnimation', [
  transition('* => *', [
    query(':enter', [style({ opacity: 0, position: 'relative' })], {
      optional: true,
    }),
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        animate('0.8s', style({ opacity: 1, position: 'relative' })),
      ],
      { optional: true }
    ),
  ]),
]);

export const slider = trigger('routeAnimations', [
  transition('* => isLeft', slideTo('left')),
  transition('* => isRight', slideTo('right')),
  transition('isRight => *', slideTo('left')),
  transition('isLeft => *', slideTo('right')),
]);

function slideTo(direction: string) {
  const optional = { optional: true };

  return [
    query(
      ':enter, :leave',
      [style({ position: 'absolute', top: 0, [direction]: 0, width: '100%' })],
      optional
    ),
    query(':enter', [style({ [direction]: '-100%' })]),
    group([
      query(
        ':leave',
        [
          animate(
            '500ms cubic-bezier(.54,.54,.8,.8)',
            style({ [direction]: '100%' })
          ),
        ],
        optional
      ),
      query(
        ':enter',
        [
          animate(
            '500ms cubic-bezier(.54,.54,.8,.8)',
            style({ [direction]: '0%' })
          ),
        ],
        optional
      ),
    ]),
  ];
}

export const slideInOut = trigger('slideInOut', [
  transition(':enter', [
    style({ transform: 'translateX(100%)' }),
    animate('400ms ease-in', style({ transform: 'translateX(0%)' })),
  ]),
  transition(':leave', [
    animate('400ms ease-in', style({ transform: 'translateX(100%)' })),
  ]),
]);

export const ingredientsState = trigger('ingredientsState', [
  state('inactive', style({ opacity: '0', transform: 'translate(-10rem)' })),
  state('active', style({ opacity: '1', transform: 'translate(0)' })),
  transition('inactive <=> active', animate('700ms ease-in-out')),
]);

export const directionsState = trigger('directionsState', [
  state('inactive', style({ opacity: '0', transform: 'translate(-10rem)' })),
  state('active', style({ opacity: '1', transform: 'translate(0)' })),
  transition('inactive <=> active', animate('700ms ease-in-out')),
]);

export const iconAnimation = trigger('iconAnimation', [
  state(
    'false',
    style({
      transform: 'rotate(-360deg)',
      opacity: 1,
    })
  ),
  transition('false => true', [animate('600ms ease-in')]),
  transition('true => false', [animate('300ms ease-out')]),
]);
