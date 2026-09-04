# Functional Requirements

## 1. Authentication and Users

The system shall allow users to authenticate and access the platform.

The initial system will support the following roles:

- Practice Admin
- Employee

Authorization will initially remain simple and will evolve as the project develops.

## 2. Practice Management

A Practice Admin shall be able to:

- Manage the practice profile
- Manage employees belonging to the practice

Conceptually:

Practice
→ Admin
→ Employees

## 3. Client Management

Users shall be able to:

- Create clients
- View clients
- Update client details
- Search and filter clients
- Mark clients as inactive

Each client belongs to a practice.

## 4. Service Areas

A practice shall be able to manage service areas.

Examples include:

- Payroll
- Bookkeeping
- Tax and Accounts
- Audit
- APCT
- Other or custom services

For Version 1, service areas will be configurable rather than implementing the internal business logic of each professional service.

## 5. Work Management

Users shall be able to create and manage work items.

Each work item shall be associated with:

- A client
- A service area

A work item shall contain:

- Title
- Description
- Client
- Service Area
- Assigned Employee
- Status
- Priority
- Due Date
- Created Date

## 6. Work Assignment and Status Workflow

Work items can be assigned to employees.

Employees shall be able to view work assigned to them.

For Version 1, work items will follow the following lifecycle:

Not Started
→ In Progress
→ Completed

Complex workflow engines and custom workflow definitions are outside the Version 1 scope.

## 7. Basic Dashboard

The system shall provide a basic dashboard showing:

- Total active clients
- Work assigned to the current user
- Overdue work
- Work grouped by status

The dashboard will initially provide basic operational visibility and may later evolve into more advanced reporting.

## 8. Version 1 Exclusions

The following features are explicitly outside the Version 1 scope:

- Payroll calculation engine
- Accounting engine
- Tax calculation engine
- Payment processing
- Notifications
- Kafka or RabbitMQ
- Redis
- Microservices
- Kubernetes
- Complex reporting

These technologies and capabilities may be evaluated later only when a real business or engineering requirement justifies them.
