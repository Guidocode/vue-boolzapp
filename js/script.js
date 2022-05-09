/*
Milestone 1
Replica della grafica con la possibilità di avere messaggi 
scritti dall’utente (verdi) e dall’interlocutore (bianco) 
assegnando due classi CSS diverse
Visualizzazione dinamica della lista contatti: tramite la 
direttiva v-for, visualizzare nome e immagine di ogni contatto

Milestone 2
Visualizzazione dinamica dei messaggi: tramite la direttiva 
v-for, visualizzare tutti i messaggi relativi al contatto 
attivo all’interno del pannello della conversazione
Click sul contatto mostra la conversazione del contatto cliccato

Milestone 3
Aggiunta di un messaggio: l’utente scrive un testo nella parte 
bassa e digitando “enter” il testo viene aggiunto al thread 
sopra, come messaggio verde
Risposta dall’interlocutore: ad ogni inserimento di un 
messaggio, l’utente riceverà un “ok” come risposta, che 
apparirà dopo 1 secondo.

Milestone 4
Ricerca utenti: scrivendo qualcosa nell’input a sinistra, 
vengono visualizzati solo i contatti il cui nome contiene 
le lettere inserite (es, Marco, Matteo Martina -> Scrivo 
“mar” rimangono solo Marco e Martina)

Milestone 5 - opzionale
Cancella messaggio: cliccando sul messaggio appare un menu a tendina 
che permette di cancellare il messaggio selezionato
Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista 
dei contatti
*/

// Estensioni DayJs
dayjs.extend(window.dayjs_plugin_customParseFormat);
dayjs.extend(window.dayjs_plugin_relativeTime);



const app = new Vue ({

  el: '#app',

  methods: {
    // Funzione che intercetta l'indice del contatto cliccato
    activeContact(indice){
      this.indexActiveContact = indice;

      this.indexActiveMessage = -1;
      // console.log(indice);
    },

    // Funzione genera e invia messaggio e stabilisce il 
    // tempo prima della risposta
    sentNewMessage(){
      const mymessage = {
        date: 'now',
        message: this.textNewMessage,
        status: 'sent'
      }
      console.log(mymessage);

      this.contacts[this.indexActiveContact].messages.push(mymessage);

      setTimeout(() => {
        this.answerOk()
      }, 1000)

      this.textNewMessage = '';
    },

    // Funzione che genera la risposta automatica
    answerOk(){
      const answer = {
        date: 'now',
        message: 'ok',
        status: 'received'
      }

      this.contacts[this.indexActiveContact].messages.push(answer);
    },

    searchContact(){
      // se il nome contatto NON include una delle lettere 
      // che scrivo visible diventa false

      const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]; 

      for (let index; index < alphabet.length; index++) {
        if (!this.contactSearched.include(index)) {
          this.contacts.visible = false;
          
        }
      }
      // console.log(this.contacts.visible);
    },

    // Funzione che intercetta l'utimo messaggio nella chat 
    // per visualizzarlo nella lista contatti
    getLastMessage(contatto){
      return contatto.messages[contatto.messages.length - 1].message;
    },

    // Funzione che intercetta la data dell'utimo messaggio nella chat 
    // per visualizzarla nella lista contatti
    getLastDate(contatto){
      return contatto.messages[contatto.messages.length - 1].date;
    },

    // Funzione per nascondere il dropdown del messaggio
    cambiaIndiceMessaggio(indice){
      
      this.indexActiveMessage = indice;
    },

    // Funzione che cancella il messaggio selezionato
    deleteMessage(indice){

      // if(indice == this.contacts[this.indexActiveContact].messages.length -1) this.indexActiveContact--;

      if(confirm('Sei sicuro di voler cancellare questo messaggio?')){
        this.contacts[this.indexActiveContact].messages.splice(indice, 1);
      }

    }
    
  },

  data: {

    // flag indice contatto attivo
    indexActiveContact: 0,

    // flag testo nuovo messaggio
    textNewMessage: '',

    contactSearched: '',

    // booleana display none/block
    indexActiveMessage: -1,


    myProfile: {
      name: 'Mark',
      avatar: '_io',
      // message: {
      //   date: '10/01/2020 15:30:55',
      //   message: 'Hai portato a spasso il cane?',
      //   status: 'sent'
      // }
        
        
    },

    contacts: [
      {
        name: 'Michele',
        avatar: '_1',
        visible: true,
        messages: [
        {
          date: '10/01/2020 15:30:55',
          message: 'Hai portato a spasso il cane?',
          status: 'sent'
        },
        {
          date: '10/01/2020 15:50:00',
          message: 'Ricordati di stendere i panni',
          status: 'sent'
        },
        {
          date: '10/01/2020 16:15:22',
          message: 'Tutto fatto!',
          status: 'received'
        }
        ],
      },
      {
        name: 'Fabio',
        avatar: '_2',
        visible: true,
        messages: [
          {
            date: '20/03/2020 16:30:00',
            message: 'Ciao come stai?',
            status: 'sent'
          },
          {
            date: '20/03/2020 16:30:55',
            message: 'Bene grazie! Stasera ci vediamo?',
            status: 'received'
          },
          {
            date: '20/03/2020 16:35:00',
            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
            status: 'sent'
          }
        ],
      },
      {
        name: 'Samuele',
        avatar: '_3',
        visible: true,
        messages: [
          {
            date: '28/03/2020 10:10:40',
            message: 'La Marianna va in campagna',
            status: 'received'
          },
          {
            date: '28/03/2020 10:20:10',
            message: 'Sicuro di non aver sbagliato chat?',
            status: 'sent'
          },
          {
            date: '28/03/2020 16:15:22',
            message: 'Ah scusa!',
            status: 'received'
          }
        ],
      },
      {
        name: 'Alessandro B.',
        avatar: '_4',
        visible: true,
        messages: [
          {
            date: '10/01/2020 15:30:55',
            message: 'Lo sai che ha aperto una nuova pizzeria?',
            status: 'sent'
          },
          {
            date: '10/01/2020 15:50:00',
            message: 'Si, ma preferirei andare al cinema',
            status: 'received'
          }
        ],
      },
      {
        name: 'Alessandro L.',
        avatar: '_5',
        visible: true,
        messages: [
          {
            date: '10/01/2020 15:30:55',
            message: 'Ricordati di chiamare la nonna',
            status: 'sent'
          },
          {
            date: '10/01/2020 15:50:00',
            message: 'Va bene, stasera la sento',
            status: 'received'
          }
        ],
      },
      {
        name: 'Claudia',
        avatar: '_6',
        visible: true,
        messages: [
          {
            date: '10/01/2020 15:30:55',
            message: 'Ciao Claudia, hai novità?',
            status: 'sent'
          },
          {
            date: '10/01/2020 15:50:00',
            message: 'Non ancora',
            status: 'received'
          },
          {
            date: '10/01/2020 15:51:00',
            message: 'Nessuna nuova, buona nuova',
            status: 'sent'
          }
        ],
      },
      {
        name: 'Federico',
        avatar: '_7',
        visible: true,
        messages: [
          {
            date: '10/01/2020 15:30:55',
            message: 'Fai gli auguri a Martina che è il suo compleanno!',
            status: 'sent'
          },
          {
            date: '10/01/2020 15:50:00',
            message: 'Grazie per avermelo ricordato, le scrivo subito!',
            status: 'received'
          }
        ],
      },
      {
        name: 'Davide',
        avatar: '_8',
        visible: true,
        messages: [
          {
            date: '10/01/2020 15:30:55',
            message: 'Ciao, andiamo a mangiare la pizza stasera?',
            status: 'received'
          },
          {
            date: '10/01/2020 15:50:00',
            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
            status: 'sent'
          },
          {
            date: '10/01/2020 15:51:00',
            message: 'OK!!',
            status: 'received'
          }
        ],
      }
    ]
  },

})