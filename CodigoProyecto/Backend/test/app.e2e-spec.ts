import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Usuario } from '../src/usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';
import { useContainer } from 'class-validator';
import { AppModule } from '../src/app.module';
import { Ficha } from '../src/fichas/entities/ficha.entity';

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let UsuariosRepository: Repository<Usuario>;
    let FichasRepository: Repository<Ficha>;
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    isGlobal: true,
                    // envFilePath: '../.env',
                }),
                TypeOrmModule.forRoot({
                    type: 'sqlite',
                    database: './test/test.db',
                    entities: ['src/**/*.entity{.ts,.js}'],
                    synchronize: true,
                    // logging: true,
                }),
                AppModule,
                // UsuariosModule,
                // AuthModule,
                // FichasModule,
                // CorreoModule,
            ],
        }).compile();
        UsuariosRepository = moduleFixture.get<Repository<Usuario>>(
            getRepositoryToken(Usuario),
        );
        FichasRepository = moduleFixture.get<Repository<Ficha>>(
            getRepositoryToken(Ficha),
        );
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        useContainer(app.select(AppModule), { fallbackOnErrors: true });
        await app.init();
    });
    describe('Integration test', () => {
        beforeAll(async () => {
            //f4b64c85-062f-4e03-b09b-d825e0575c15
            const usuario = await UsuariosRepository.create({
                nombres_usuario: 'Andres',
                apellidos_usuario: 'Gomez Gomez',
                numero_documento: 25252525,
                emailInstitucional: 'agomez@misena.edu.co',
                direccion_residencial: 'crra a 24 s',
                telefono_movil: 3214545454,
                id_tipo_documento: 1,
                id_tipo_rol: 2,
                id_ciudad: 1,
                password:
                    '$2b$10$tI9/D06MlgMMwuKVVXDFmOhxVdjB760u8BzXZE.OX5mXgpeWO2iTW',
            });
            //3d28aeaf-195f-4e2d-baeb-48603e061db5
            const usuario2 = await UsuariosRepository.create({
                nombres_usuario: 'Camilo',
                apellidos_usuario: 'Garcia Lopez',
                numero_documento: 1001277963,
                emailInstitucional: 'cgarcia369@misena.edu.co',
                direccion_residencial: 'crra 5 abis # 48 r 08 sur',
                telefono_movil: 3214572317,
                id_tipo_documento: 1,
                id_tipo_rol: 1,
                id_ciudad: 1,
                password:
                    '$2b$10$r/ii54LEHxgQTaF4CtLoke57rQDat44TBOYOeaRt0Ag03Nr/c8zmi',
            });
            await UsuariosRepository.save(usuario);
            await UsuariosRepository.save(usuario2);
        });
        describe('Auth', () => {
            it('/auth/login (POST) deberia responder con un estado 200 y devolver un jwt Token , si el usuario y contraseña son correctos', () => {
                return request(app.getHttpServer())
                    .post('/auth/login')
                    .send({
                        emailInstitucional: 'cgarcia369@misena.edu.co',
                        password: '3d28aeaf-195f-4e2d-baeb-48603e061db5',
                    })
                    .expect(201)
                    .then((response) => {
                        expect(response.body.token).toEqual(expect.any(String));
                    });
            });
            it('/auth/login (POST) deberia responder con un estado 401 "Unauthorized, El correo y/o contraseña no son correctos." si la contraseña no es correcta', () => {
                return request(app.getHttpServer())
                    .post('/auth/login')
                    .send({
                        emailInstitucional: 'cgarcia369@misena.edu.co',
                        password: '123456',
                    })
                    .expect(401)
                    .then((response) =>
                        expect(response.body.message).toBe(
                            'El correo y/o contraseña no son correctos.',
                        ),
                    );
            });
            it('/auth/login (POST) deberia responder con un estado 401 "Unauthorized, El correo y/o contraseña no son correctos." si el usuario no existe', () => {
                return request(app.getHttpServer())
                    .post('/auth/login')
                    .send({
                        emailInstitucional: 'test@misena.edu.co',
                        password: '123456',
                    })
                    .expect(401)
                    .then((response) =>
                        expect(response.body.message).toBe(
                            'El correo y/o contraseña no son correctos.',
                        ),
                    );
            });
        });
        describe('Usuarios Fichas', () => {
            let token: string;

            beforeAll(async () => {
                const response = await request(app.getHttpServer())
                    .post('/auth/login')
                    .send({
                        emailInstitucional: 'cgarcia369@misena.edu.co',
                        password: '3d28aeaf-195f-4e2d-baeb-48603e061db5',
                    });
                token = response.body.token;
            });

            describe('JWT Auth', () => {
                let tokenSinPermisos: string;
                beforeEach(async () => {
                    const response = await request(app.getHttpServer())
                        .post('/auth/login')
                        .send({
                            emailInstitucional: 'agomez@misena.edu.co',
                            password: 'f4b64c85-062f-4e03-b09b-d825e0575c15',
                        });
                    tokenSinPermisos = response.body.token;
                });
                it('Todas las rutas deberian responder con un estado 401 si el token no se envia', () => {
                    return request(app.getHttpServer())
                        .get('/usuarios')
                        .expect(401);
                });
                it('Todas las rutas deberian responder con un estado 401  si el token ya expiro', () => {
                    const tokenVencido =
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjo1Mywibm9tYnJlc191c3VhcmlvIjoiQ2FtaWxvIiwiYXBlbGxpZG9zX3VzdWFyaW8iOiJHYXJjaWEgTG9wZXoiLCJudW1lcm9fZG9jdW1lbnRvIjoiMTAwMTI3Nzk2MyIsImVtYWlsSW5zdGl0dWNpb25hbCI6ImNnYXJjaWEzNjlAbWlzZW5hLmVkdS5jbyIsImRpcmVjY2lvbl9yZXNpZGVuY2lhbCI6ImNycmEgNSBhYmlzICMgNDggciAwOCBzdXIiLCJ0ZWxlZm9ub19tb3ZpbCI6IjMyMTQ1NzIzMTciLCJpZF90aXBvX2RvY3VtZW50byI6MSwiaWRfdGlwb19yb2wiOjEsImlkX2NpdWRhZCI6MSwidGlwb19kb2N1bWVudG8iOnsiaWRfdGlwb19kb2N1bWVudG8iOjEsIm5vbWJyZV90aXBvX2RvY3VtZW50byI6IkNlZHVsYSBkZSBjaXVkYWRhbsOtYS4ifSwicm9sIjp7ImlkX3RpcG9fcm9sIjoxLCJub21icmVfcm9sIjoiQWRtaW5pc3RyYWRvciJ9LCJjaXVkYWQiOnsiaWRfY2l1ZGFkIjoxLCJub21icmVfY2l1ZGFkIjoiQm9nb3TDoSJ9LCJpYXQiOjE2MzIzMzA0MiwiZXhwIjoxNjMyMzMwNDJ9.y7ko-DlmMUvLSp3QN68QmESBGVQoUs00AwlRcFL0Wcg';
                    return request(app.getHttpServer())
                        .get('/usuarios')
                        .set('Authorization', 'bearer ' + tokenVencido)
                        .expect(401);
                });
                it('Todas las rutas deberian responder con un estado 401 si el token no corresponde a ningun usuario', () => {
                    const tokenDeUsuarioNoExistente =
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjo1Mywibm9tYnJlc191c3VhcmlvIjoiQ2FtaWxvIiwiYXBlbGxpZG9zX3VzdWFyaW8iOiJHYXJjaWEgTG9wZXoiLCJudW1lcm9fZG9jdW1lbnRvIjoiMTAwMTI3Nzk2MyIsImVtYWlsSW5zdGl0dWNpb25hbCI6ImNnYXJjaWEzNjlAbWlzZW5hLmVkdS5jbyIsImRpcmVjY2lvbl9yZXNpZGVuY2lhbCI6ImNycmEgNSBhYmlzICMgNDggciAwOCBzdXIiLCJ0ZWxlZm9ub19tb3ZpbCI6IjMyMTQ1NzIzMTciLCJpZF90aXBvX2RvY3VtZW50byI6MSwiaWRfdGlwb19yb2wiOjEsImlkX2NpdWRhZCI6MSwidGlwb19kb2N1bWVudG8iOnsiaWRfdGlwb19kb2N1bWVudG8iOjEsIm5vbWJyZV90aXBvX2RvY3VtZW50byI6IkNlZHVsYSBkZSBjaXVkYWRhbsOtYS4ifSwicm9sIjp7ImlkX3RpcG9fcm9sIjoxLCJub21icmVfcm9sIjoiQWRtaW5pc3RyYWRvciJ9LCJjaXVkYWQiOnsiaWRfY2l1ZGFkIjoxLCJub21icmVfY2l1ZGFkIjoiQm9nb3TDoSJ9LCJpYXQiOjE2OTIzOTcwNDksImV4cCI6MTY5MjM5MzA0OX0.7Eo3aX_-RbFCsj6fKUAdmRWYfk0KgDJyU0fhA65rr9g';
                    return request(app.getHttpServer())
                        .get('/usuarios')
                        .set(
                            'Authorization',
                            'bearer ' + tokenDeUsuarioNoExistente,
                        )
                        .expect(401)
                        .then((response) => {
                            expect(response.body.message).toBe(
                                'El usuario asociado al token no existe.',
                            );
                        });
                });
                it('Todas las rutas deberian responder con un estado 401 si el usuario no posee los permisos necesarios para el endpoint', () => {
                    return request(app.getHttpServer())
                        .get('/usuarios')
                        .set('Authorization', 'bearer ' + tokenSinPermisos)
                        .expect(401)
                        .then((response) => {
                            expect(response.body.message).toBe(
                                'No posee los permisos necesarios para esta acción.',
                            );
                        });
                });
            });

            describe('/usuarios', () => {
                describe('/usuarios (GET)', () => {
                    it('Deberia responder con una lista de usuarios y un estado de 200.', () => {
                        return request(app.getHttpServer())
                            .get('/usuarios')
                            .set('Authorization', 'bearer ' + token)
                            .expect(200)
                            .then((response) => {
                                response.body.map((usuario) => {
                                    expect(usuario).toMatchObject({
                                        id_usuario: expect.any(Number),
                                        nombres_usuario: expect.any(String),
                                        apellidos_usuario: expect.any(String),
                                        numero_documento: expect.any(Number),
                                        emailInstitucional: expect.any(String),
                                        direccion_residencial:
                                            expect.any(String),
                                        telefono_movil: expect.any(Number),
                                        id_tipo_documento: expect.any(Number),
                                        id_tipo_rol: expect.any(Number),
                                        id_ciudad: expect.any(Number),
                                    });
                                });
                            });
                    });
                });
                describe('/usuarios/{id} (GET)', () => {
                    it('Deberia responder con el usuario correspondiente al id y un estado de 200.', () => {
                        return request(app.getHttpServer())
                            .get('/usuarios/1')
                            .set('Authorization', 'bearer ' + token)
                            .expect(200)
                            .then((response) => {
                                expect(response.body).toMatchObject({
                                    id_usuario: 1,
                                    nombres_usuario: expect.any(String),
                                    apellidos_usuario: expect.any(String),
                                    numero_documento: expect.any(Number),
                                    emailInstitucional: expect.any(String),
                                    direccion_residencial: expect.any(String),
                                    telefono_movil: expect.any(Number),
                                    id_tipo_documento: expect.any(Number),
                                    id_tipo_rol: expect.any(Number),
                                    id_ciudad: expect.any(Number),
                                });
                            });
                    });
                    it('Deberia responder con un estado de 404 si el usuario no existe.', () => {
                        return request(app.getHttpServer())
                            .get('/usuarios/500')
                            .set('Authorization', 'bearer ' + token)
                            .expect(404);
                    });
                });
                describe('/usuarios (POST)', () => {
                    it('Deberia recibir un usuario , crearlo y responder con un estado de 201 y el usuario creado', () => {
                        return request(app.getHttpServer())
                            .post('/usuarios')
                            .set('Authorization', 'bearer ' + token)
                            .send({
                                nombres_usuario: 'testss',
                                apellidos_usuario: 'test test',
                                numero_documento: 1111111,
                                emailInstitucional: 'test@misena.edu.co',
                                direccion_residencial: 'tes test',
                                telefono_movil: 1111111,
                                id_tipo_documento: 1,
                                id_tipo_rol: 2,
                                id_ciudad: 1,
                            })
                            .then((response) => {
                                expect(response.body).toMatchObject({
                                    id_usuario: expect.any(Number),
                                    nombres_usuario: expect.any(String),
                                    apellidos_usuario: expect.any(String),
                                    numero_documento: expect.any(Number),
                                    emailInstitucional: expect.any(String),
                                    direccion_residencial: expect.any(String),
                                    telefono_movil: expect.any(Number),
                                    id_tipo_documento: expect.any(Number),
                                    id_tipo_rol: expect.any(Number),
                                    id_ciudad: expect.any(Number),
                                });
                            });
                    });
                    it('Deberia responder con un estado de 400 si el usuario enviado no cumple con las condiciones de los campos', () => {
                        return request(app.getHttpServer())
                            .post('/usuarios')
                            .set('Authorization', 'bearer ' + token)
                            .send({
                                nombres_usuario: 'Andres',
                                apellidos_usuario: 'Gomez Gomez',
                                numero_documento: 11,
                                emailInstitucional: 'test@misena.edu.co',
                                direccion_residencial: 'tes test',
                                telefono_movil: 11,
                                id_tipo_documento: 1,
                                id_tipo_rol: 2,
                                id_ciudad: 1,
                            })
                            .expect(400);
                    });
                });
                describe('/usuarios/{id} (PATCH)', () => {
                    let id: number;
                    beforeAll(async () => {
                        let usuarioNuevos: Usuario[] = [
                            UsuariosRepository.create({
                                nombres_usuario: 'Fallen',
                                apellidos_usuario: 'Cuarto',
                                numero_documento: 12234567,
                                emailInstitucional: 'fcuarto@misena.edu.co',
                                direccion_residencial: 'crra a 25 s',
                                telefono_movil: 3214567891,
                                password: '1234',
                                id_tipo_documento: 1,
                                id_tipo_rol: 2,
                                id_ciudad: 1,
                            }),
                            UsuariosRepository.create({
                                nombres_usuario: 'Fallen',
                                apellidos_usuario: 'Quinto',
                                numero_documento: 78941256,
                                emailInstitucional: 'fcuarto5@misena.edu.co',
                                direccion_residencial: 'crra a 25 s',
                                telefono_movil: 1256631475,
                                password: '1234',
                                id_tipo_documento: 1,
                                id_tipo_rol: 2,
                                id_ciudad: 1,
                            }),
                        ];
                        usuarioNuevos = await UsuariosRepository.save(
                            usuarioNuevos,
                        );
                        id = usuarioNuevos[0].id_usuario;
                    });
                    it('Deberia recibir un usuario , actualizarlo y responder con un estado de 201 y el usuario actualizado', () => {
                        return request(app.getHttpServer())
                            .patch(`/usuarios/${id}`)
                            .set('Authorization', 'bearer ' + token)
                            .send({
                                nombres_usuario: 'Fallen',
                                apellidos_usuario: 'Tercero',
                                numero_documento: 12234567,
                                emailInstitucional: 'fcuarto@misena.edu.co',
                                direccion_residencial: 'crra a 25 s s3',
                                telefono_movil: 3214567891,
                                id_tipo_documento: 1,
                                id_tipo_rol: 2,
                                id_ciudad: 1,
                            })
                            .then((response) => {
                                expect(response.body).toMatchObject({
                                    id_usuario: expect.any(Number),
                                    nombres_usuario: expect.any(String),
                                    apellidos_usuario: expect.any(String),
                                    numero_documento: expect.any(Number),
                                    emailInstitucional: expect.any(String),
                                    direccion_residencial: expect.any(String),
                                    telefono_movil: expect.any(Number),
                                    id_tipo_documento: expect.any(Number),
                                    id_tipo_rol: expect.any(Number),
                                    id_ciudad: expect.any(Number),
                                });
                            });
                    });
                    it('Deberia responder con un estado de 400 si el usuario no cumple con las condiciones de los campos', () => {
                        return request(app.getHttpServer())
                            .patch(`/usuarios/${id}`)
                            .set('Authorization', 'bearer ' + token)
                            .send({})
                            .expect(400);
                    });
                    it('Deberia responder con un estado de 404 si el id enviado no corresponde a ningun usuario', () => {
                        return request(app.getHttpServer())
                            .patch(`/usuarios/999`)
                            .set('Authorization', 'bearer ' + token)
                            .send({
                                nombres_usuario: 'Fallen',
                                apellidos_usuario: 'Tercero',
                                numero_documento: 12234567,
                                emailInstitucional: 'fcuarto5@misena.edu.co',
                                direccion_residencial: 'crra a 25 s s3',
                                telefono_movil: 3214567891,
                                id_tipo_documento: 1,
                                id_tipo_rol: 2,
                                id_ciudad: 1,
                            })
                            .expect(404);
                    });
                });
                describe('/usuarios/{id} (DELETE)', () => {
                    let id: number;
                    beforeAll(async () => {
                        id = (
                            await UsuariosRepository.save(
                                UsuariosRepository.create({
                                    nombres_usuario: 'Andrea',
                                    apellidos_usuario: 'Hernandez',
                                    numero_documento: 10101010,
                                    emailInstitucional:
                                        'ahernandez@misena.edu.co',
                                    direccion_residencial: 'crra a 25 s',
                                    telefono_movil: 101010101,
                                    password: '1234',
                                    id_tipo_documento: 1,
                                    id_tipo_rol: 2,
                                    id_ciudad: 1,
                                }),
                            )
                        ).id_usuario;
                    });
                    it('Deberia eliminar el usuario relacionado con el id enviado y responder con un estado 200', () => {
                        return request(app.getHttpServer())
                            .delete(`/usuarios/${id}`)
                            .set('Authorization', 'bearer ' + token)
                            .expect(200);
                    });
                    it('Deberia responder con un estado de 404 si el id enviado no corresponde a ningun usuario', () => {
                        return request(app.getHttpServer())
                            .delete(`/usuarios/9999`)
                            .set('Authorization', 'bearer ' + token)
                            .expect(404);
                    });
                });
            });
            describe.only('Fichas', () => {
                beforeAll(async () => {
                    await FichasRepository.save([
                        { id_programa: 1 },
                        { id_programa: 1 },
                        { id_programa: 2 },
                    ]);
                });
                describe('/fichas (GET)', () => {
                    it('Deberia responder con una lista de fichas y un estado de 200.', () => {
                        return request(app.getHttpServer())
                            .get(`/fichas`)
                            .set('Authorization', 'bearer ' + token)
                            .expect(200)
                            .then((response) => {
                                response.body.map((ficha) => {
                                    expect(ficha).toMatchObject({
                                        id_programa: expect.any(Number),
                                    });
                                });
                            });
                    });
                });
                describe('/fichas/{id} (GET)', () => {
                    it('Deberia responder con la ficha correspondiente al id y un estado de 200.', () => {
                        return request(app.getHttpServer())
                            .get('/fichas/1')
                            .set('Authorization', 'bearer ' + token)
                            .expect(200)
                            .then((response) => {
                                expect(response.body).toMatchObject({
                                    id_programa: expect.any(Number),
                                });
                            });
                    });
                    it('Deberia responder con un estado de 404 si la ficha no existe.', () => {
                        return request(app.getHttpServer())
                            .get('/fichas/999')
                            .set('Authorization', 'bearer ' + token)
                            .expect(404);
                    });
                });
                describe('/fichas (POST)', () => {
                    it('Deberia recibir una ficha , crearlo y responder con un estado de 201 y la ficha creada', () => {
                        return request(app.getHttpServer())
                            .post('/fichas')
                            .set('Authorization', 'bearer ' + token)
                            .send({ id_programa: 1 })
                            .expect(201)
                            .then((response) => {
                                expect(response.body).toMatchObject({
                                    id_ficha: expect.any(Number),
                                    id_programa: expect.any(Number),
                                });
                            });
                    });
                    it('Deberia responder con un estado de 400 si la ficha enviada no cumple con las condiciones de los campos', () => {
                        return request(app.getHttpServer())
                            .post('/fichas')
                            .set('Authorization', 'bearer ' + token)
                            .send({})
                            .expect(400);
                    });
                });
                describe('/fichas/{id} (PATCH)', () => {
                    it('Deberia recibir una ficha , actualizarlo y responder con un estado de 201 y la ficha actualizada', () => {
                        return request(app.getHttpServer())
                            .patch(`/fichas/1`)
                            .set('Authorization', 'bearer ' + token)
                            .send({
                                id_programa: 1,
                            })
                            .then((response) => {
                                expect(response.body).toMatchObject({
                                    id_ficha: expect.any(Number),
                                    id_programa: expect.any(Number),
                                });
                            });
                    });
                    it('Deberia responder con un estado de 400 si la ficha enviada no cumple con las condiciones de los campos', () => {
                        return request(app.getHttpServer())
                            .patch(`/fichas/1`)
                            .set('Authorization', 'bearer ' + token)
                            .send({})
                            .expect(400);
                    });
                    it('Deberia responder con un estado de 404 si el id enviado no corresponde a ninguna ficha', () => {
                        return request(app.getHttpServer())
                            .patch(`/fichas/999`)
                            .set('Authorization', 'bearer ' + token)
                            .send({
                                id_programa: 1,
                            })
                            .expect(404);
                    });
                });
                describe('/fichas/{id} (DELETE)', () => {
                    it('Deberia eliminar la ficha relacionado con el id enviado y responder con un estado de 200', () => {
                        return request(app.getHttpServer())
                            .delete(`/fichas/1`)
                            .set('Authorization', 'bearer ' + token)
                            .expect(200);
                    });
                    it('Deberia responder con un estado de 404 si el id enviado no corresponde a ninguna ficha', () => {
                        return request(app.getHttpServer())
                            .delete(`/fichas/9999`)
                            .set('Authorization', 'bearer ' + token)
                            .expect(404);
                    });
                });
            });
        });
    });

    afterAll(async () => {
        // setTimeout(async () => {
        //     await UsuariosRepository.clear();
        //     await UsuariosRepository.query(
        //         "UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='usuario'",
        //     );
        // }, 15000);
        await UsuariosRepository.clear();
        await UsuariosRepository.query(
            "UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='usuario'",
        );
        await FichasRepository.clear();
        await FichasRepository.query(
            "UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='ficha'",
        );
    });
});
