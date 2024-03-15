use rand::Rng;
use std::collections::HashMap;

#[derive(Debug)]
struct Dice {
    side: u32,
    times: u32,
}

fn roll_dice(dice_list: Vec<Dice>) -> HashMap<u32, Vec<u32>> {
    let mut results: HashMap<u32, Vec<u32>> = HashMap::new();
    
    for (index, dice) in dice_list.iter().enumerate() {
        let mut roll_results: Vec<u32> = Vec::new();
        
        for _ in 0..dice.times {
            let roll = rand::thread_rng().gen_range(1..=dice.side);
            roll_results.push(roll);
        }
        
        results.insert((index + 1) as u32, roll_results);
    }
    
    results
}

fn main() {
    let dice_rolls = vec![
        Dice { side: 20, times: 4 },
        Dice { side: 6, times: 2 },
        Dice { side: 10, times: 3 },
    ];

    let results = roll_dice(dice_rolls);
    
    for (index, rolls) in results.iter() {
        println!("Dice {}: Rolls: {:?}", index, rolls);
    }
}
