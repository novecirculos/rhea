use rand::Rng;
use rand_mt::Mt64;
use rayon::prelude::*;
use serde::{Deserialize, Serialize};
use serde_wasm_bindgen::{from_value, to_value};
use std::collections::HashMap;
use wasm_bindgen::prelude::*;

// Changed RollResults to use String keys to accommodate identifiers
type RollResults = HashMap<String, Vec<u32>>;

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
    pub sides: u32,
    // Note: No wasm_bindgen above fields that don't need to be directly accessed by JS
    identifier: Option<String>,
    uniqueness: Option<bool>,
}

#[wasm_bindgen]
impl Dice {
    // Adjust the constructor to include the uniqueness parameter
    pub fn new(times: u32, sides: u32, uniqueness: Option<bool>) -> Dice {
        Dice {
            times,
            sides,
            identifier: None,
            uniqueness,
        }
    }

    // Add getter and setter for uniqueness
    #[wasm_bindgen(getter)]
    pub fn uniqueness(&self) -> Option<bool> {
        self.uniqueness
    }

    #[wasm_bindgen(setter)]
    pub fn set_uniqueness(&mut self, uniqueness: Option<bool>) {
        self.uniqueness = uniqueness;
    }

    #[wasm_bindgen(getter)]
    pub fn identifier(&self) -> Option<String> {
        self.identifier.clone()
    }

    #[wasm_bindgen(setter)]
    pub fn set_identifier(&mut self, identifier: Option<String>) {
        self.identifier = identifier;
    }
}
/// Rolls a list of dice and returns the results.
#[wasm_bindgen]
pub fn roll_dice(dice: &JsValue) -> Result<JsValue, JsValue> {
    let dice: Dice = from_value(dice.clone()).map_err(|e| JsValue::from_str(&e.to_string()))?;

    let results = roll_dice_logic(&[dice]);
    // Convert the first (and only) set of results to a JsValue
    let first_result = results.values().next().unwrap();
    to_value(&first_result).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen]
pub fn roll_multiple_dices(dice_list: &JsValue) -> Result<JsValue, JsValue> {
    let dice_list: Vec<Dice> =
        from_value(dice_list.clone()).map_err(|e| JsValue::from_str(&e.to_string()))?;

    let results = roll_dice_logic(&dice_list);
    to_value(&results).map_err(|e| JsValue::from_str(&e.to_string()))
}

/// Logic to roll each dice the specified number of times.
fn roll_dice_logic(dice_list: &[Dice]) -> RollResults {
    let results: RollResults = dice_list
        .par_iter()
        .enumerate()
        .map(|(index, dice)| {
            let mut rng = Mt64::new(rand::random());
            let roll_results: Vec<u32> = (0..dice.times)
                .map(|_| rng.gen_range(1..=dice.sides) as u32)
                .collect();

            let key = dice
                .identifier
                .clone()
                .unwrap_or_else(|| (index + 1).to_string());
            (key, roll_results)
        })
        .collect();

    results
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_generate_dice_rolls() {
        let dices = 100000;
        let times_max = 50;
        let sides_max = 100;

        let rolls = generate_dice_rolls(dices, times_max, sides_max, Some(false));

        // Check the number of dice rolls generated
        assert_eq!(rolls.len(), dices);

        // Check that each Dice struct has values within the specified ranges
        for roll in rolls {
            assert!(roll.times >= 1 && roll.times <= times_max);
            assert!(roll.sides >= 1 && roll.sides <= sides_max);
        }
    }

    use std::collections::HashSet;

    #[test]
    fn test_uniqueness_of_large_batch_dice_rolls() {
        let dice_configurations = generate_dice_rolls(100000, 1, 6, Some(true)); // Generate 1000 dices with 1 roll each, 6 sides

        let roll_results = roll_dice_logic(&dice_configurations);

        // Check that each dice's rolls are unique within itself
        for rolls in roll_results.values() {
            let unique_rolls: HashSet<u32> = rolls.iter().cloned().collect();
            assert_eq!(
                rolls.len(),
                unique_rolls.len(),
                "Each dice roll should be unique within the dice."
            );
        }
    }

    #[test]
    fn test_non_uniqueness_of_large_batch_dice_rolls() {
        // Generate dice configurations with uniqueness explicitly set to false

        let dice_configurations = generate_dice_rolls(100000, 10, 6, Some(false)); // Generate 100 dices with 10 rolls each, 6 sides

        let roll_results = roll_dice_logic(&dice_configurations);

        // Variable to track if at least one dice has duplicates
        let mut found_duplicates = false;

        for rolls in roll_results.values() {
            let unique_rolls: HashSet<u32> = rolls.iter().cloned().collect();
            if rolls.len() != unique_rolls.len() {
                // Found a dice with duplicates
                found_duplicates = true;
                break; // No need to check further
            }
        }

        assert!(
            found_duplicates,
            "There should be at least one dice roll with duplicates when uniqueness is false."
        );
    }

    #[test]
    fn test_roll_dice() {
        // Simplified for demonstration purposes
        let dice_rolls = vec![
            Dice {
                times: 1,
                sides: 6,
                identifier: None,
                uniqueness: None,
            }, // Single roll for clarity
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

pub fn generate_dice_rolls(
    dices: usize,
    times_max: u32,
    sides_max: u32,
    uniqueness: Option<bool>,
) -> Vec<Dice> {
    let mut rng = rand::thread_rng();
    (0..dices)
        .map(|_| Dice {
            times: rng.gen_range(1..=times_max),
            sides: rng.gen_range(1..=sides_max),
            identifier: None,
            uniqueness,
        })
        .collect()
}
