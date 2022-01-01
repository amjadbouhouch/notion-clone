module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  variants: {
    textColor: ({ after }) => after(["invalid"]),
    extend: {
      backgroundColor: ["active"],
      display: ["group-hover"],
    },
    scrollbar: ["rounded"],
  },
  plugins: [],
};
