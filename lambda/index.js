/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
// i18n dependencies. i18n is the main module, sprintf allows us to include variables with '%s'.
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const languageStrings = {
    en: {
        translation: {
            WELCOME_MESSAGE: `Welcome to Curious Facts about Messi. Here you will discover fascinating facts about Lionel Messi. You can say "tell me a curiosity about Messi" to get started, or "Help" if you need more information. What would you like to do?`,
            HELP_MESSAGE: `I'm here to surprise you with facts about Lionel Messi! You can say "tell me a curiosity about Messi" to hear an interesting fact, or just say Help. How can I help you?`,
            GOODBYE_MESSAGE: 'See you later! I hope you enjoyed learning about Lionel Messi. Come back soon to discover more curiosities.',
            REFLECTOR_MESSAGE: 'You just triggered %s',
            FALLBACK_MESSAGE: `Sorry, I have no information about that. But I can tell you something interesting about Lionel Messi if you prefer. Would you like to hear a curiosity about Messi?`,
            ERROR_MESSAGE: 'Oops! Something seems to have gone wrong. Please try again. In the meantime, would you like me to tell you a curiosity about Lionel Messi?',
            GET_FRASES_MSG: 'A curious fact is ...',
            GET_FRASES_MSG2: '..., you can ask for another fun fact ... or tell me a fun fact about Messi ... or, if you want to stop me just say, Cancel! ... so how can I help you?',
            MESSI_FACTS: [
                'Lionel Messi has won the Ballon d\'Or 7 times, more than any other player in history.',
                'Messi scored 91 goals in a calendar year in 2012, breaking the previous record of 85 goals set by Gerd Müller in 1972.',
                'He has spent his entire professional club career with FC Barcelona until 2021, where he won 35 trophies, including 10 La Liga titles and 4 UEFA Champions League titles.',
                'Messi is the only player to score in 23 consecutive league matches in La Liga.',
                'He holds the record for most hat-tricks in La Liga history, with 36 hat-tricks.',
                'Lionel Messi is the all-time top scorer for both FC Barcelona and La Liga.',
                'Messi was awarded the Golden Foot in 2020, an award given to players over the age of 28 for their athletic achievements and personality.',
                'In 2021, Messi joined Paris Saint-Germain after 21 years with FC Barcelona.',
                'Messi has played in 5 World Cups (2006, 2010, 2014, 2018, and 2022) and won the tournament in 2022.',
                'He has scored over 700 goals in his professional career, including club and international matches.'
            ]
        }
    },
    es: {
        translation: {
            WELCOME_MESSAGE: `Bienvenido a Curiosidades sobre Messi. Aquí descubrirás datos fascinantes sobre Lionel Messi. Puedes decir "dime una curiosidad sobre Messi" para empezar, o "Ayuda" si necesitas más información. ¿Qué te gustaría hacer?`,
            HELP_MESSAGE: `¡Estoy aquí para sorprenderte con datos sobre Lionel Messi! Puedes decir "dime una curiosidad sobre Messi" para escuchar un dato interesante, o simplemente decir Ayuda. ¿En qué te puedo ayudar?`,
            GOODBYE_MESSAGE: '¡Hasta luego! Espero que hayas disfrutado aprendiendo sobre Lionel Messi. Vuelve pronto para descubrir más curiosidades.',
            REFLECTOR_MESSAGE: 'Acabas de activar %s',
            FALLBACK_MESSAGE: `Lo siento, no tengo información sobre eso. Pero puedo contarte algo interesante sobre Lionel Messi si lo prefieres. ¿Te gustaría escuchar una curiosidad sobre Messi?`,
            ERROR_MESSAGE: '¡Ups! Parece que algo salió mal. Por favor, inténtalo de nuevo. Mientras tanto, ¿quieres que te cuente una curiosidad sobre Lionel Messi?',
            GET_FRASES_MSG: 'Un dato curioso es ...',
            GET_FRASES_MSG2: '..., puedes pedir otro dato curioso... o dime un dato curioso sobre Messi ... o, si deseas detenerme solo di, ¡Cancela! ... entonces ¿cómo te puedo ayudar?',
            MESSI_FACTS: [
                'Lionel Messi ha ganado el Balón de Oro 7 veces, más que cualquier otro jugador en la historia.',
                'Messi anotó 91 goles en un año calendario en 2012, rompiendo el récord anterior de 85 goles establecido por Gerd Müller en 1972.',
                'Pasó toda su carrera profesional en el club con el FC Barcelona hasta 2021, donde ganó 35 trofeos, incluidos 10 títulos de La Liga y 4 títulos de la UEFA Champions League.',
                'Messi es el único jugador que ha marcado en 23 partidos consecutivos de liga en La Liga.',
                'Tiene el récord de más hat-tricks en la historia de La Liga, con 36 hat-tricks.',
                'Lionel Messi es el máximo goleador de todos los tiempos tanto del FC Barcelona como de La Liga.',
                'Messi recibió el Golden Foot en 2020, un premio otorgado a jugadores mayores de 28 años por sus logros deportivos y personalidad.',
                'En 2021, Messi se unió al Paris Saint-Germain después de 21 años con el FC Barcelona.',
                'Messi ha jugado en 5 Copas del Mundo (2006, 2010, 2014, 2018 y 2022) y ganó el torneo en 2022.',
                'Ha marcado más de 700 goles en su carrera profesional, incluyendo partidos de club e internacionales.'
            ]
        }
    }
};


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const FrasesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FrasesIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const messiFacts = requestAttributes.t('MESSI_FACTS');
        const randomIndex = Math.floor(Math.random() * messiFacts.length);
        const randomFact = messiFacts[randomIndex];
        const speakOutput = requestAttributes.t('GET_FRASES_MSG') + randomFact + requestAttributes.t('GET_FRASES_MSG2');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt("dd a reprompt if you want to keep the session open for the user to respond")
            .getResponse();
    }
};


const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// This request interceptor will log all incoming requests to this lambda
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

// This response interceptor will log all outgoing responses of this lambda
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
        console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

// This request interceptor will bind a translation function 't' to the requestAttributes.
const LocalizationInterceptor = {
    process(handlerInput) {
        const localizationClient = i18n.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            fallbackLng: 'en',
            overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
            resources: languageStrings,
            returnObjects: true
        });

        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = function (...args) {
            return localizationClient.t(...args);
        }
    }
};


/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        FrasesIntentHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        LocalizationInterceptor,
        LoggingRequestInterceptor)
    .addResponseInterceptors(
        LoggingResponseInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();