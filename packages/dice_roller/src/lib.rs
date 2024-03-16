use rand::Rng;
use serde::{Deserialize, Serialize};
use serde_wasm_bindgen::{from_value, to_value};
use std::collections::HashMap;
use wasm_bindgen::prelude::*;

type RollResults = HashMap<u32, Vec<u32>>;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

/// Represents a dice with a specific number of sides, to be rolled a certain number of times.
#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub struct Dice {
    pub times: u32,
    pub side: u32,
}

#[wasm_bindgen]
impl Dice {
    /// Creates a new `Dice` instance.
    #[wasm_bindgen(constructor)]
    pub fn new(times: u32, side: u32) -> Dice {
        Dice { times, side }
    }
}

/// Rolls a list of dice and returns the results.
#[wasm_bindgen]
pub fn roll_dice(dice_list: &JsValue) -> Result<JsValue, JsValue> {
    let dice_list_result: Result<Vec<Dice>, serde_wasm_bindgen::Error> =
        from_value(dice_list.clone());

    match dice_list_result {
        Ok(dice_list) => {
            let results = roll_dice_logic(&dice_list);
            to_value(&results).map_err(|e| JsValue::from_str(&e.to_string()))
        }
        Err(e) => Err(JsValue::from_str(&e.to_string())),
    }
}
/// Logic to roll each dice the specified number of times.
fn roll_dice_logic(dice_list: &[Dice]) -> RollResults {
    let mut results: RollResults = HashMap::new();

    for (index, dice) in dice_list.iter().enumerate() {
        let roll_results: Vec<u32> = (0..dice.times)
            .map(|_| rand::thread_rng().gen_range(1..=dice.side))
            .collect();

        results.insert(index as u32 + 1, roll_results);
    }

    results
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_generate_dice_rolls() {
        let dices = 1000000;
        let times_max = 50;
        let side_max = 100;

        let rolls = generate_dice_rolls(dices, times_max, side_max);

        // Check the number of dice rolls generated
        assert_eq!(rolls.len(), dices);

        // Check that each Dice struct has values within the specified ranges
        for roll in rolls {
            assert!(roll.times >= 1 && roll.times <= times_max);
            assert!(roll.side >= 1 && roll.side <= side_max);
        }
    }

    #[test]
    fn test_roll_dice() {
        // Simplified for demonstration purposes
        let dice_rolls = vec![
            Dice { times: 1, side: 6 }, // Single roll for clarity
        ];
        let results = roll_dice_logic(&dice_rolls);

        // Assert that we have results for each dice
        assert_eq!(results.len(), 1);

        for (_, rolls) in results {
            // Now we assert the actual conditions expected
            assert_eq!(rolls.len(), 1); // Check if we have one roll for our dice
            assert!(rolls[0] >= 1 && rolls[0] <= 6); // Check if the roll is within the expected range
        }
    }
}

pub fn generate_dice_rolls(dices: usize, times_max: u32, side_max: u32) -> Vec<Dice> {
    let mut rng = rand::thread_rng();
    (0..dices)
        .map(|_| Dice {
            side: rng.gen_range(1..=side_max),
            times: rng.gen_range(1..=times_max),
        })
        .collect()
}
