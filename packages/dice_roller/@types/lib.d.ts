
export interface DiceConfiguration {
 sides: number;
 times: number;
 identifier?: string;
}

/**
* Rolls multiple dice configurations and returns the results in a map.
* The map's key is the index of the dice configuration, and the value is an array of roll results.
* @param {DiceConfiguration[]} dice_list - An array of dice configurations.
* @returns {Map<number, number[]>} - A map where each key is the index of the dice configuration and the value is an array of roll results.
*/
export function roll_multiple_dices(dice_list: DiceConfiguration[]): Map<number, number[]>;