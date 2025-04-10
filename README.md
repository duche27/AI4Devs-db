Guillermo Fernández Raboso's solution

Final status of the Candidates/Recruiters DB relationship diagram:

![DB diagram.png](pictures/DB%20diagram.png)


### Textual Representation of Database Relationships

- **Recruiter**
  - Fields: `id`, `firstName`, `lastName`, `email`, `phone`, `department`, `isActive`, `createdAt`, `updatedAt`
  - Relationships:
    - **One-to-Many**: Has multiple **Candidates**

- **Candidate**
  - Fields: `id`, `firstName`, `lastName`, `email`, `phone`, `address`, `status`, `position`, `recruiterId`, `createdAt`, `updatedAt`
  - Relationships:
    - **Many-to-One**: Belongs to a **Recruiter**
    - **One-to-Many**: Has multiple **Educations**
    - **One-to-Many**: Has multiple **WorkExperiences**
    - **One-to-Many**: Has multiple **Resumes**

- **Education**
  - Fields: `id`, `institution`, `title`, `startDate`, `endDate`, `candidateId`
  - Relationships:
    - **Many-to-One**: Belongs to a **Candidate**

- **WorkExperience**
  - Fields: `id`, `company`, `position`, `description`, `startDate`, `endDate`, `candidateId`
  - Relationships:
    - **Many-to-One**: Belongs to a **Candidate**

- **Resume**
  - Fields: `id`, `filePath`, `fileType`, `uploadDate`, `candidateId`
  - Relationships:
    - **Many-to-One**: Belongs to a **Candidate**