export const frames = [ // number of frames in effect
    [1, 5, 5, 8, 8, 4, 4, 4],
    [1, 7, 7, 12, 12, 6, 6, 6],
    [1, 9, 9, 16, 16, 8, 8, 8]
];

export const shifts = [ /* shifts[display model][effect num][frame num][segment num] =0: blank, >0: new data, <0: old data. */
    [ // 4 digits display
        [ // No animation
            [1, 2, 3, 4]
        ],
        [ // To the right
            [0, -1, -2, -3],
            [4, 0, -1, -2],
            [3, 4, 0, -1],
            [2, 3, 4, 0],
            [1, 2, 3, 4]
        ],
        [ // To the left
            [-2, -3, -4, 0],
            [-3, -4, 0, 1],
            [-4, 0, 1, 2],
            [0, 1, 2, 3],
            [1, 2, 3, 4]
        ],
        [ // From the right
            [0, -1, -2, -3],
            [0, 0, -1, -2],
            [0, 0, 0, -1],
            [0, 0, 0, 0],
            [0, 0, 0, 1],
            [0, 0, 1, 2],
            [0, 1, 2, 3],
            [1, 2, 3, 4]
        ],
        [ // From the left
            [-2, -3, -4, 0],
            [-3, -4, 0, 0],
            [-4, 0, 0, 0],
            [0, 0, 0, 0],
            [4, 0, 0, 0],
            [3, 4, 0, 0],
            [2, 3, 4, 0],
            [1, 2, 3, 4]
        ],
        [ // To the sides
            [-2, 0, 0, -3],
            [0, 0, 0, 0],
            [2, 0, 0, 3],
            [1, 2, 3, 4]
        ],
        [ // Layering from the right
            [-1, -2, -3, 4],
            [-1, -2, 3, 4],
            [-1, 2, 3, 4],
            [1, 2, 3, 4]
        ],
        [ // Layering from the left
            [1, -2, -3, -4],
            [1, 2, -3, -4],
            [1, 2, 3, -4],
            [1, 2, 3, 4]
        ]
    ],
    [ // 6 digits display
        [ // No animation
            [1, 2, 3, 4, 5, 6]
        ],
        [ // To the right
            [0, -1, -2, -3, -4, -5],
            [6, 0, -1, -2, -3, -4],
            [5, 6, 0, -1, -2, -3],
            [4, 5, 6, 0, -1, -2],
            [3, 4, 5, 6, 0, -1],
            [2, 3, 4, 5, 6, 0],
            [1, 2, 3, 4, 5, 6]
        ],
        [ // To the left
            [-2, -3, -4, -5, -6, 0],
            [-3, -4, -5, -6, 0, 1],
            [-4, -5, -6, 0, 1, 2],
            [-5, -6, 0, 1, 2, 3],
            [-6, 0, 1, 2, 3, 4],
            [0, 1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5, 6]
        ],
        [ // From the right
            [0, -1, -2, -3, -4, -5],
            [0, 0, -1, -2, -3, -4],
            [0, 0, 0, -1, -2, -3],
            [0, 0, 0, 0, -1, -2],
            [0, 0, 0, 0, 0, -1],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 1, 2],
            [0, 0, 0, 1, 2, 3],
            [0, 0, 1, 2, 3, 4],
            [0, 1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5, 6]
        ],
        [ // From the left
            [-2, -3, -4, -5, -6, 0],
            [-3, -4, -5, -6, 0, 0],
            [-4, -5, -6, 0, 0, 0],
            [-5, -6, 0, 0, 0, 0],
            [-6, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [6, 0, 0, 0, 0, 0],
            [5, 6, 0, 0, 0, 0],
            [4, 5, 6, 0, 0, 0],
            [3, 4, 5, 6, 0, 0],
            [2, 3, 4, 5, 6, 0],
            [1, 2, 3, 4, 5, 6]
        ],
        [ // To the sides
            [-2, -3, 0, 0, -4, -5],
            [-3, 0, 0, 0, 0, -4],
            [0, 0, 0, 0, 0, 0],
            [3, 0, 0, 0, 0, 4],
            [2, 3, 0, 0, 4, 5],
            [1, 2, 3, 4, 5, 6]
        ],
        [ // Layering from the right
            [-1, -2, -3, -4, -5, 6],
            [-1, -2, -3, -4, 5, 6],
            [-1, -2, -3, 4, 5, 6],
            [-1, -2, 3, 4, 5, 6],
            [-1, 2, 3, 4, 5, 6],
            [1, 2, 3, 4, 5, 6]
        ],
        [ // Layering from the left
            [1, -2, -3, -4, -5, -6],
            [1, 2, -3, -4, -5, -6],
            [1, 2, 3, -4, -5, -6],
            [1, 2, 3, 4, -5, -6],
            [1, 2, 3, 4, 5, -6],
            [1, 2, 3, 4, 5, 6]
        ]
    ],
    [ // 8 digits display
        [ // No animation
            [1, 2, 3, 4, 5, 6, 7, 8]
        ],
        [ // To the right
            [0, -1, -2, -3, -4, -5, -6, -7],
            [8, 0, -1, -2, -3, -4, -5, -6],
            [7, 8, 0, -1, -2, -3, -4, -5],
            [6, 7, 8, 0, -1, -2, -3, -4],
            [5, 6, 7, 8, 0, -1, -2, -3],
            [4, 5, 6, 7, 8, 0, -1, -2],
            [3, 4, 5, 6, 7, 8, 0, -1],
            [2, 3, 4, 5, 6, 7, 8, 0],
            [1, 2, 3, 4, 5, 6, 7, 8]
        ],
        [ // To the left
            [-2, -3, -4, -5, -6, -7, -8, 0],
            [-3, -4, -5, -6, -7, -8, 0, 1],
            [-4, -5, -6, -7, -8, 0, 1, 2],
            [-5, -6, -7, -8, 0, 1, 2, 3],
            [-6, -7, -8, 0, 1, 2, 3, 4],
            [-7, -8, 0, 1, 2, 3, 4, 5],
            [-8, 0, 1, 2, 3, 4, 5, 6],
            [0, 1, 2, 3, 4, 5, 6, 7],
            [1, 2, 3, 4, 5, 6, 7, 8]
        ],
        [ // From the right
            [0, -1, -2, -3, -4, -5, -6, -7],
            [0, 0, -1, -2, -3, -4, -5, -6],
            [0, 0, 0, -1, -2, -3, -4, -5],
            [0, 0, 0, 0, -1, -2, -3, -4],
            [0, 0, 0, 0, 0, -1, -2, -3],
            [0, 0, 0, 0, 0, 0, -1, -2],
            [0, 0, 0, 0, 0, 0, 0, -1],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 1, 2],
            [0, 0, 0, 0, 0, 1, 2, 3],
            [0, 0, 0, 0, 1, 2, 3, 4],
            [0, 0, 0, 1, 2, 3, 4, 5],
            [0, 0, 1, 2, 3, 4, 5, 6],
            [0, 1, 2, 3, 4, 5, 6, 7],
            [1, 2, 3, 4, 5, 6, 7, 8]
        ],
        [ // From the left
            [-2, -3, -4, -5, -6, -7, -8, 0],
            [-3, -4, -5, -6, -7, -8, 0, 0],
            [-4, -5, -6, -7, -8, 0, 0, 0],
            [-5, -6, -7, -8, 0, 0, 0, 0],
            [-6, -7, -8, 0, 0, 0, 0, 0],
            [-7, -8, 0, 0, 0, 0, 0, 0],
            [-8, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [8, 0, 0, 0, 0, 0, 0, 0],
            [7, 8, 0, 0, 0, 0, 0, 0],
            [6, 7, 8, 0, 0, 0, 0, 0],
            [5, 6, 7, 8, 0, 0, 0, 0],
            [4, 5, 6, 7, 8, 0, 0, 0],
            [3, 4, 5, 6, 7, 8, 0, 0],
            [2, 3, 4, 5, 6, 7, 8, 0],
            [1, 2, 3, 4, 5, 6, 7, 8]
        ],
        [ // To the sides
            [-2, -3, -4, 0, 0, -5, -6, -7],
            [-3, -4, 0, 0, 0, 0, -5, -6],
            [-4, 0, 0, 0, 0, 0, 0, -5],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [4, 0, 0, 0, 0, 0, 0, 5],
            [3, 4, 0, 0, 0, 0, 5, 6],
            [2, 3, 4, 0, 0, 5, 6, 7],
            [1, 2, 3, 4, 5, 6, 7, 8]
        ],
        [ // Layering from the right
            [-1, -2, -3, -4, -5, -6, -7, 8],
            [-1, -2, -3, -4, -5, -6, 7, 8],
            [-1, -2, -3, -4, -5, 6, 7, 8],
            [-1, -2, -3, -4, 5, 6, 7, 8],
            [-1, -2, -3, 4, 5, 6, 7, 8],
            [-1, -2, 3, 4, 5, 6, 7, 8],
            [-1, 2, 3, 4, 5, 6, 7, 8],
            [1, 2, 3, 4, 5, 6, 7, 8]
        ],
        [ // Layering from the left
            [1, -2, -3, -4, -5, -6, -7, -8],
            [1, 2, -3, -4, -5, -6, -7, -8],
            [1, 2, 3, -4, -5, -6, -7, -8],
            [1, 2, 3, 4, -5, -6, -7, -8],
            [1, 2, 3, 4, 5, -6, -7, -8],
            [1, 2, 3, 4, 5, 6, -7, -8],
            [1, 2, 3, 4, 5, 6, 7, -8],
            [1, 2, 3, 4, 5, 6, 7, 8]
        ]
    ]
];