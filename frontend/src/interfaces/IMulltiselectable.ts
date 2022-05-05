export interface IMultiselectable {
    uniqueStrings : string[],
    alreadySelected : string[],
    onItemClick : CallableFunction,
}