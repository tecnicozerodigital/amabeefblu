<script>
import col from './col'
export { col }
export default col
</script>

<style lang="scss">
@import '@/assets/styles/mq.scss';

$grid: (
    1: 8.3333333333%,
    2: 16.6666666667%,
    3: 25%,
    4: 33.3333333333%,
    5: 41.6666666667%,
    6: 50%,
    7: 58.3333333333%,
    8: 66.6666666667%,
    9: 75%,
    10: 83.3333333333%,
    11: 91.6666666667%,
    12: 100%
);

@mixin col () {
    position: relative;
    width: 100%;
    max-width: 100%;
    padding: var(--grid-gutter);
    // border: 1px solid orange;
}

.bxs-col {
    @include col;
    flex-grow: 1;
    flex-basis: 0;
}

.bxs-col-auto {
    @include col;
    flex: 0 0 auto;
    width: auto;
    max-width: auto;
}

@each $key, $value in $grid {
    .bxs-col-#{$key} {
        @include col;
        flex: 0 0 $value;
        max-width: $value;
    }

    .bxs-col-offset-#{$key} {
        margin-left: $value;
    }

    .bxs-col-order-#{$key} {
        order: $key;
    }
}

@each $breakpoint in map-keys($mq-breakpoints) {
    @each $key, $value in $grid {
        @include mq($breakpoint) {
            .bxs-col-#{$breakpoint}-#{$key} {
                @include col;

                flex: 0 0 $value;
                max-width: $value;
            }

            .bxs-col-offset-#{$breakpoint}-#{$key} {
                margin-left: $value;
            }

            .bxs-col-order-#{$breakpoint}-#{$key} {
                order: $key;
            }
        }
    }
}
</style>
