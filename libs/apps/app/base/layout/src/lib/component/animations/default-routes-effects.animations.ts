import {
  animate,
  animateChild,
  AnimationGroupMetadata,
  AnimationQueryMetadata,
  // keyframes,
  AnimationTriggerMetadata,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

// ---------------------------------------------

// Default

export const defaultAnimations: AnimationTriggerMetadata = trigger(
  'routeAnimations',
  [
    // slide effects

    // ----------------

    transition('stepper-step1 => stepper-step2', slideTo('left')),
    transition('stepper-step1 => stepper-step3', slideTo('left')),
    transition('stepper-step2 => stepper-step3', slideTo('left')),

    transition('stepper-step3 => stepper-step2', slideTo('right')),
    transition('stepper-step3 => stepper-step1', slideTo('right')),
    transition('stepper-step2 => stepper-step1', slideTo('right')),

    // ----------------

    transition('stepper-step1-inverted => stepper-step2', slideTo('left')),
    transition('stepper-step1-inverted => stepper-step3', slideTo('left')),
    transition('stepper-step2-inverted => stepper-step3', slideTo('left')),

    transition('stepper-step3-inverted => stepper-step2', slideTo('right')),
    transition('stepper-step3-inverted => stepper-step1', slideTo('right')),
    transition('stepper-step2-inverted => stepper-step1', slideTo('right')),

    // ----------------

    transition('stepper-step1 => stepper-step2-inverted', slideTo('right')),
    transition('stepper-step1 => stepper-step3-inverted', slideTo('right')),
    transition('stepper-step2 => stepper-step3-inverted', slideTo('right')),

    transition('stepper-step3 => stepper-step2-inverted', slideTo('left')),
    transition('stepper-step3 => stepper-step1-inverted', slideTo('left')),
    transition('stepper-step2 => stepper-step1-inverted', slideTo('left')),

    // ----------------

    transition(
      'stepper-step1-inverted => stepper-step2-inverted',
      slideTo('right')
    ),
    transition(
      'stepper-step1-inverted => stepper-step3-inverted',
      slideTo('right')
    ),
    transition(
      'stepper-step2-inverted => stepper-step3-inverted',
      slideTo('right')
    ),

    transition(
      'stepper-step3-inverted => stepper-step2-inverted',
      slideTo('left')
    ),
    transition(
      'stepper-step3-inverted => stepper-step1-inverted',
      slideTo('left')
    ),
    transition(
      'stepper-step2-inverted => stepper-step1-inverted',
      slideTo('left')
    ),

    // ----------------

    transition('* <=> *', [
      // Set a default  style for enter and leave
      query(
        ':enter, :leave',
        [
          style({
            position: 'absolute',
            left: 0,
            width: '100%',
            opacity: 0,
            transform: 'scale(0) translateY(100%)',
          }),
        ],
        { optional: true }
      ),
      // Animate the new page in
      query(
        ':enter',
        [
          animate(
            '600ms ease',
            style({ opacity: 1, transform: 'scale(1) translateY(0)' })
          ),
        ],
        { optional: true }
      ),
    ]),

    // stepper effects

    // transition('* <=> *', [
    //   query(':enter, :leave', [
    //     style({
    //       position: 'absolute',
    //       left: 0,
    //       width: '100%',
    //     }),
    //   ], {optional: true}),
    //   group([
    //     query(':enter', [
    //       animate('2000ms ease', keyframes([
    //         style({transform: 'scale(0) translateX(100%)', offset: 0}),
    //         style({transform: 'scale(0.5) translateX(25%)', offset: 0.3}),
    //         style({transform: 'scale(1) translateX(0%)', offset: 1}),
    //       ])),
    //     ], {optional: true}),
    //     query(':leave', [
    //       animate('2000ms ease', keyframes([
    //         style({transform: 'scale(1)', offset: 0}),
    //         style({transform: 'scale(0.5) translateX(-25%) rotate(0)', offset: 0.35}),
    //         style({opacity: 0, transform: 'translateX(-50%) rotate(-180deg) scale(6)', offset: 1}),
    //       ])),
    //     ], {optional: true})
    //   ]),
    // ]),

    // fade in effects

    // transition('* <=> *', [
    //   query(':enter, :leave', [
    //     style({
    //       position: 'absolute',
    //       left: 0,
    //       width: '100%',
    //       opacity: 0,
    //       transform: 'scale(0) translateY(100%)',
    //     }),
    //   ], {optional: true}),
    //   query(':enter', [
    //     animate('600ms ease',
    //       style({
    //         opacity: 1,
    //         transform: 'scale(1) translateY(0)'
    //       })
    //     )
    //   ], {optional: true}),
    // ]),
  ]
);

// ---------------------------------------------

// Basic

export const faderAnimations: AnimationTriggerMetadata = trigger(
  'routeAnimations',
  [
    transition('* <=> *', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
          transform: 'scale(0) translateY(100%)',
        }),
      ]),
      query(':enter', [
        animate(
          '600ms ease',
          style({ opacity: 1, transform: 'scale(1) translateY(0)' })
        ),
      ]),
    ]),
  ]
);

// Positioned

export const noneAnimations: AnimationTriggerMetadata = trigger(
  'routeAnimations',
  []
);

export const sliderAnimations: AnimationTriggerMetadata = trigger(
  'routeAnimations',
  [
    transition('* => isLeft', slideTo('left')),
    transition('* => isRight', slideTo('right')),
    transition('isRight => *', slideTo('left')),
    transition('isLeft => *', slideTo('right')),
  ]
);

export const transformerAnimations: AnimationTriggerMetadata = trigger(
  'routeAnimations',
  [
    transition('* => isLeft', translateTo({ x: -100, y: -100, rotate: -720 })),
    transition('* => isRight', translateTo({ x: 100, y: -100, rotate: 90 })),
    transition('isRight => *', translateTo({ x: -100, y: -100, rotate: 360 })),
    transition('isLeft => *', translateTo({ x: 100, y: -100, rotate: -360 })),
  ]
);

// ---------------------------------------------

function slideTo(
  direction: string
): (AnimationQueryMetadata | AnimationGroupMetadata)[] {
  const optional = { optional: true };
  return [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          [direction]: 0,
          width: '100%',
        }),
      ],
      optional
    ),
    query(':enter', [style({ [direction]: '100%' })], optional),
    group([
      query(
        ':leave',
        [animate('600ms ease', style({ [direction]: '-100%' }))],
        optional
      ),
      query(
        ':enter',
        [animate('600ms ease', style({ [direction]: '0%' }))],
        optional
      ),
    ]),
    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    // query(':leave', animateChild()),
    // query(':enter', animateChild()),
  ];
}

function translateTo({
  x = 100,
  y = 0,
  rotate = 0,
}): (AnimationQueryMetadata | AnimationGroupMetadata)[] {
  const optional = { optional: true };
  return [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      optional
    ),
    query(':enter', [
      style({ transform: `translate(${x}%, ${y}%) rotate(${rotate}deg)` }),
    ]),
    group([
      query(
        ':leave',
        [
          animate(
            '600ms ease-out',
            style({ transform: `translate(${x}%, ${y}%) rotate(${rotate}deg)` })
          ),
        ],
        optional
      ),
      query(':enter', [
        animate(
          '600ms ease-out',
          style({ transform: `translate(0, 0) rotate(0)` })
        ),
      ]),
    ]),
  ];
}

// ---------------------------------------------
