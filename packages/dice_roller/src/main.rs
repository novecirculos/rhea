use rand::Rng; 

#[derive(Debug)]
struct Dice {
    side: u32,
    times: u32,
}

fn roll_dice(dice_list: Vec<Dice>) -> Vec<u32> {
    let mut results = Vec::new();
    for dice in dice_list {
        let mut dice_result = 0;
        for _ in 0..dice.times {
            dice_result += rand::thread_rng().gen_range(1..=dice.side);
        }
        results.push(dice_result);
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
    println!("Results of dice rolls: {:?}", results);
}
