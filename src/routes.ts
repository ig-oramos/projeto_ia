import { Router, Request, Response } from "express";
import { UsersController } from "./controllers/UsersController";
import { MessagesController } from "./controllers/MessagesController"
import { DoctorsController } from './controllers/DoctorsController';
import { UsersService } from "./services/UsersService";
import { ConnectionsService } from "./services/ConnectionsService";
import { DoctorsService } from "./services/DoctorsService";
import { MessagesService } from "./services/MessagesService";
import { ConsultationsService } from "./services/ConsultationsService";

const routes = Router();
const usersController = new UsersController();
const messagesController = new MessagesController();
const doctorsController = new DoctorsController();

// IBM Watson credentials
const credentials = {
    version: '{version}',
    apikey: '{api_key}',
    serviceUrl: '{serviceUrl}',
    assistantId: '{assistantId}'
};

const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');
const assistant = new AssistantV2({
    version: credentials.version,
    authenticator: new IamAuthenticator({
        apikey: credentials.apikey,
    }),
    serviceUrl: credentials.serviceUrl,
    disableSslVerification: true
});
routes.post('/messages', async (request: Request, response: Response) => {

    // messagesController.create
    const { text, email } = request.body;
    if (text.length < 2) {
        response.json({
            text: 'Não entendi, poderia reformular sua frase?'
        });
    } else if (email.length < 10) {
        response.json({
            text: 'Este e-mail não parece válido. ' +
                'Poderia informar o e-mail corretamente?'
        });
    } else {
        const usersService = new UsersService();
        const connectionsService = new ConnectionsService();
        const doctorsService = new DoctorsService();
        const messagesService = new MessagesService();
        const consultationsService = new ConsultationsService();

        let user_id: string;

        const userExists = await usersService.findByEmail(email);
        if (userExists)
            user_id = userExists.id;
        else {
            const user = await usersService.create(email);
            user_id = user.id;
        }

        let connection = await connectionsService.findByUserId(user_id);

        // Stores the user message
        await messagesService.create({
            text,
            user_id
        });

        const sendMessage = () => {
            assistant.message({
                assistantId: credentials.assistantId,
                sessionId: connection.session_id,
                input: {
                    'message_type': 'text',
                    'text': text
                }
            }).then(async res => {
                let adminResponse: string = res.result.output.generic[0].text;

                const index = adminResponse.indexOf('agendada');
                if (index != -1) {
                    const doctorSpecialty: string = adminResponse.substring(70,
                        adminResponse.length - 1);
                    const date: Date = new Date(
                        `${adminResponse.substr(46, 10)}T${adminResponse.substr(29, 8)}`);
                    if (date.getTime() - Date.now() < 86400000)
                        date.setTime(date.getTime() + 86400000);

                    adminResponse = adminResponse.substr(0, 46) + date.toLocaleDateString() +
                        adminResponse.substr(56);
                    const doctors = await doctorsService.findBySpecialty(
                        doctorSpecialty);

                    await consultationsService.create({
                        user_id,
                        consultation_date: date,
                        doctor_id: doctors[0].id
                    });

                    assistant.deleteSession({
                        assistantId: credentials.assistantId,
                        sessionId: connection.session_id,
                    }).then(res => {

                    }).catch(err => {
                        console.log(err);
                    });
                }
                const adminMessage = await messagesService.create({
                    text: adminResponse,
                    user_id,
                    admin_id: credentials.assistantId
                });

                response.json({
                    text: adminMessage.text
                });
            }).catch(err => {
                console.log(err);
            });
        }

        if (connection) {
            // Testa a sessão com o Watson
            assistant.message({
                assistantId: credentials.assistantId,
                sessionId: connection.session_id,
                input: {
                    'message_type': 'text',
                    'text': 'Olá'
                }
            }).then(() => {
                sendMessage();
            }).catch(err => {
                assistant.createSession({
                    assistantId: credentials.assistantId
                }).then(async res => {
                    connection.session_id = res.result.session_id;
                    await connectionsService.updateSessionId(user_id,
                        connection.session_id);
                    sendMessage();
                }).catch(err => {
                    console.log(err);
                });
            });
        } else {
            // await
            assistant.createSession({
                assistantId: credentials.assistantId
            }).then(async res => {
                connection = await connectionsService.create({
                    user_id,
                    admin_id: credentials.assistantId,
                    session_id: res.result.session_id
                });
                sendMessage();
            }).catch(err => {
                console.log(err);
            });
        }
    }
});

routes.post('/doctors', doctorsController.create);
routes.get('/doctors/:specialty', doctorsController.findBySpecialty);

routes.post("/users", usersController.create);
routes.put('/users')

routes.post("/messages", messagesController.create);
routes.get("/messages/:id", messagesController.showByUser);

export { routes };
