import { createMachine, assign } from "xstate";

const bookingMachine = createMachine(
  {
    id: "buy plane tickets",
    initial: "initial",
    context: {
      selectedContry: "",
      passengers: [],
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
      },
      tickets: {
        on: {
          FINISH: "initial",
        },
      },
      passengers: {
        on: {
          DONE: "tickets",
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
        console.log("Imprimir inicio")
        context.passengers = []
        context.selectedContry = ''
      },
      imprimirEntrada: () => console.log("Imprimir entrada a search"),
      imprimirSalida: () => console.log("Imprimir salida del search"),
    },
  }
);

export default bookingMachine;
