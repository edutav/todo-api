'use strict';

const Route = use('Route');

/**
 * Rotas para usuários
 */
Route.post('users', 'UserController.store').validator('User');

/**
 * Rotas para tokens
 */
Route.post('sessions', 'SessionController.store').validator('Session');

/**
 * Rotas para recuperar senha
 */
Route.post('passwords', 'ForgotPasswordController.store').validator(
  'ForgotPassword'
);
Route.put('passwords', 'ForgotPasswordController.update').validator(
  'ResetPassword'
);

/**
 * Rotas para usuários logados
 */
Route.group(() => {
  /**
   * Rotas para upload de arquivos
   */
  Route.post('/files', 'FileController.store');
  Route.get('/files/:id', 'FileController.show');

  /**
   * Rotas crud Project
   */
  Route.resource('projects', 'ProjectController')
    .apiOnly()
    .validator(new Map([[['projects.store'], ['Project']]]));

  /**
   * Rotas crud Tasks
   */
  Route.resource('projects.tasks', 'TaskController')
    .apiOnly()
    .validator(new Map([[['projects.tasks.store'], ['Task']]]));
}).middleware(['auth']);
