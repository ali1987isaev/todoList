const state = {
  tasks: [
    {
      _id: Date.now().toString(),
      title: 'Morning routine, for every day:',
      text: `-Wake up early in the morning! -Do morning exercises! -Do 50 push-ups! 
      -Take a cold shower! -Do not be distracted by various videos throughout the day
      `,
    },
  ],
  deletedTasks: [],
  themes: {
    purple: {
      "--bgColor": "rgb(197, 164, 193)",
      "--mainTextColor": "rgb(51, 43, 51)",
      "--secondaryTextColor": "rgb(173, 83, 167)",
      "--feather": "url(../images/feather_pink.svg)",
      "--deleteBtn": "rgb(214, 54, 102)",
    },
    tomato: {
      "--bgColor": "rgb(219, 117, 77)",
      "--mainTextColor": "rgb(99, 59, 27)",
      "--secondaryTextColor": "rgb(116, 66, 91)",
      "--feather": "url(../images/feather_red.svg)",
      "--deleteBtn": "rgb(228, 69, 29)",
    },
    dark: {
      "--bgColor": "rgb(40, 43, 42)",
      "--mainTextColor": "#fff",
      "--secondaryTextColor": "rgb(243, 208, 11)",
      "--feather": "url(../images/feather_dark.svg)",
      "--deleteBtn": "rgb(238, 82, 43)",
    },
    lite: {
      "--bgColor": "rgb(114, 168, 152)",
      "--mainTextColor": "rgb(30, 65, 54)",
      "--secondaryTextColor": "rgb(177, 230, 214)",
      "--feather": "url(../images/feather_lite.svg)",
      "--deleteBtn": "rgb(192, 119, 153)",
    },
  },
};

// { _id: 1,
//   title: "Read a book every day.",
//   text: "When you’re reading a book every day, you will feed your brain with more and more knowledge. Do you know what’s the best way to store up all this knowledge and information?"
// },
// { _id: 2,
//   title: "Write English text every day.",
//   text: "When you’re reading a book every day, you will feed your brain with more and more knowledge. Do you know what’s the best way to store up all this knowledge and information?"
// },
// { _id: 3,
//   title: "Listen and watch English movie or audio files, every day.",
//   text: "When you’re reading a book every day, you will feed your brain with more and more knowledge. Do you know what’s the best way to store up all this knowledge and information?"
// },
