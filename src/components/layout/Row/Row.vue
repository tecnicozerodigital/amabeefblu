<script>
import row from './row'
export { row }
export default row
</script>

<style lang="scss">
.bxs-row {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 auto;
    margin-left: calc(var(--grid-gutter) * -1);
    margin-right: calc(var(--grid-gutter) * -1);
    // border: 1px solid red;

    &.bxs-row-no-gutters {
        margin: 0;

        > [class*='col'] {
            padding: 0;
        }
    }
}
</style>
