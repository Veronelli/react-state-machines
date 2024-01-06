import { createMachine } from "xstate";

const bookingMachine = createMachine({
  id: "archivos",
  type: "parallel",
  states: {
    upload: {
      initial: "initial",
      states: {
        initial: {
          on: {
            INIT_UPLOAD: { target: "loading" },
          },
        },
        loading: {
          on: {
            UPLOAD_COMPLETE: { target: "finish" },
          },
        },
        finish: {},
      },
    },
    download: {
      initial: "initial",
      states: {
        initial: {
          on: {
            INIT_DOWNLOAD: {
              target: "downloading",
            },
          },
        },
        downloading: {
          on: {
            DOWNLOAD_COMPLETED: {
              target: "finish",
            },
          },
        },
        finish: {},
      },
    },
  },
});

export default bookingMachine;
