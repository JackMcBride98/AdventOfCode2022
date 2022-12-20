# Initialize grid and positions of head and tail
grid = [['.' for _ in range(10)] for _ in range(10)]
head_row, head_col = 3, 3
tail_row, tail_col = 3, 3

# Process instructions
instructions = ["R 4", "U 4", "L 3", "D 1", "R 4", "D 1", "L 5", "R 2"]
for instruction in instructions:
    # Parse instruction
    direction, steps = instruction[0], int(instruction[1:])

    # Update position of head
    if direction == "R":
        head_col += steps
    elif direction == "U":
        head_row -= steps
    elif direction == "L":
        head_col -= steps
    elif direction == "D":
        head_row += steps

    # Update position of tail
    if abs(head_row - tail_row) > 1 or abs(head_col - tail_col) > 1:
        # Tail is not touching head and is not in same row or column
        if head_row > tail_row:
            tail_row += 1
        elif head_row < tail_row:
            tail_row -= 1
        elif head_col > tail_col:
            tail_col += 1
        elif head_col < tail_col:
            tail_col -= 1
    elif (head_row == tail_row and abs(head_col - tail_col) == 1) or (head_col == tail_col and abs(head_row - tail_row) == 1):
        # Tail is two steps directly up, down, left, or right from head
        if direction == "R":
            tail_col += 1
        elif direction == "U":
            tail_row -= 1
        elif direction == "L":
            tail_col -= 1
        elif direction == "D":
            tail_row += 1

    # Update grid with new positions of head and tail
    grid[head_row][head_col] = 'H'
    grid[tail_row][tail_col] = 'T'

# Print final state of grid
for row in grid:
    print(''.join(row))