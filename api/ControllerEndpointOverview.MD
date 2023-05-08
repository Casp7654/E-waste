# Controller Endpoint Overview

`[x]` == Working, `[ ]` == Not yet Implemented

## General Endpoints

### Default

- [x] `GET /` => DefaultController.index

### Authentication

- [x] `POST /auth/login` => AuthController.login
- [x] `POST /auth/login/static ` => AuthController.loginStatic


## CRUD Endpoints

- [x] `GET /[entity]` => Entity<sup>*</sup>CrudController.index
- [x] `POST /[entity]/:id` => Entity<sup>*</sup>CrudController.create
- [x] `GET /[entity]/:id` => Entity<sup>*</sup>CrudController.read
- [x] `PUT /[entity]/:id` => Entity<sup>*</sup>CrudController.update
- [ ] `DELETE /[entity]/:id` => Entity<sup>*</sup>CrudController.delete

## Development Endpoints

### Inject

- [x] `GET /inject/login` => InjectContorller.injectTestDataForLogin
- [x] `GET /inject/registration` => InjectController.injectTestDataForRegistration
- [ ] `GET /inject/reusability` => InjectController.injectTestDataForReusability
- [ ] `GET /inject/testing` => InjectController.injectTestDataForTesting

## Registration Endpoints

### General Component Endpoint

- [x] `GET /components/` => ComponentController.getAll
- [x] `GET /components/:id` => ComponentController.getById
- [ ] `PATCH /components/:id` => ComponentController.updateById
- [ ] `GET /components/model/:id` => ComponentController.getByModelId
- [ ] `GET /components/type/:id` => ComponentController.getByTypeId
- [ ] `GET /components/placement/:id` => ComponentController.getTableData


## View Endpoints

### Overview Endpoint

- [x] `GET /overview/table` => OverviewController.getTableData
- [x] `GET /overview/dataset` => OverviewController.getDatasetData

### Resellability Endpoint

- [x] `GET /resellability/table` => ResellabilityController.getTableData
- [x] `GET /resellability/dataset` => ResellabilityController.getDatasetData

### Recyclability Endpoint

- [x] `GET /recyclability/table` => RecyclabilityController.getTableData
- [x] `GET /recyclability/dataset` => RecyclabilityController.getDatasetData

### Repurposability Endpoint

- [x] `GET /repurposability/table` => RepurposabilityController.getTableData
- [x] `GET /repurposability/dataset` => RepurposabilityController.getDatasetData
