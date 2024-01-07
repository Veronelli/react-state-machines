import { createMachine, assign } from "xstate";
import { invoke } from "xstate/lib/actionTypes";
import { fetchCountries } from "../Utils/api";

const fillCountry = {
  initial: "loading",
  states: {
    loading: {
      invoke: {
        id: "getCounties",
        src: () => fetchCountries,
        onDone: {
          target: "success",
          actions: assign({
            countries: (context, event) => event.data,
          }),
        },
        onError: {
          target: "failure",
          actions: assign({
            error: "Failure Request",
          }),
        },
      },
    },
    success: {},
    failure: {
      on: {
        RETRY: {
          target: "loading",
        },
      },
    },
  },
};

const bookingMachine = createMachine(
  {
    id: "buy plane tickets",
    initial: "initial",
    context: {
      selectedContry: "",
      passengers: [],
      countries: [],
      error: "",
    },
    states: {
      initial: {
        on: {
          START: {
            target: "search",
            actions: "imprimirInicio",
          },
        },
      },
      search: {
        entry: "imprimirEntrada",
        exit: "imprimirSalida",
        on: {
          CONTINUE: {
            target: "passengers",
            actions: assign({
              selectedContry: (context, event) => event.selectedContry,
            }),
          },
          CANCEL: "initial",
        },
        ...fillCountry,
      },
      tickets: {
        on: {
          FINISH: "initial",
          CANCEL: "initial",
        },
      },
      passengers: {
        on: {
          DONE: {
            target: "tickets",
            cond: "moreThanOnePassanger",
          },
          CANCEL: "initial",
          ADD: {
            target: "passengers",
            actions: assign((context, event) => {
              context.passengers.push(event.newPassanger);
            }),
          },
        },
      },
    },
  },
  {
    actions: {
      imprimirInicio: (context) => {
        console.log("Imprimir inicio");
        context.passengers = [];
        context.selectedContry = "";
      },
      imprimirEntrada: () => console.log("Imprimir entrada a search"),
      imprimirSalida: () => console.log("Imprimir salida del search"),
    },
    guards: {
      moreThanOnePassanger: (context) => context.passengers.length > 0,
    },
  }
);

export default bookingMachine;
