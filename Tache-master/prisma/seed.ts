import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Créer des utilisateurs
  const user1 = await prisma.utilisateur.create({
    data: {
      nom: 'Doe',
      prenom: 'John',
      email: 'john.doe@example.com',
      login: 'johndoe',
      password: await bcrypt.hash('password123', 10),
      genre: 'HOMME',
      adresse: '123 Main St',
      telephone: 123456789,
    },
  });

  const user2 = await prisma.utilisateur.create({
    data: {
      nom: 'Smith',
      prenom: 'Jane',
      email: 'jane.smith@example.com',
      login: 'janesmith',
      password: await bcrypt.hash('password456', 10),
      genre: 'FEMME',
      adresse: '456 Elm St',
      telephone: 987654321,
    },
  });

  // Créer des tâches
  const task1 = await prisma.taches.create({
    data: {
      titre: 'Tâche exemple 1',
      description: 'Description de la tâche 1',
      statut: 'A_FAIRE',
      dateDebut: new Date('2023-10-01'),
      dateFin: new Date('2023-10-05'),
      utilisateurId: user1.id,
    },
  });

  const task2 = await prisma.taches.create({
    data: {
      titre: 'Tâche exemple 2',
      description: 'Description de la tâche 2',
      statut: 'EN_COURS',
      dateDebut: new Date('2023-10-02'),
      dateFin: new Date('2023-10-10'),
      utilisateurId: user2.id,
    },
  });

  const task3 = await prisma.taches.create({
    data: {
      titre: 'Tâche exemple 3',
      description: 'Description de la tâche 3',
      statut: 'TERMINER',
      dateDebut: new Date('2023-09-15'),
      dateFin: new Date('2023-09-20'),
      utilisateurId: user1.id,
    },
  });

  // Créer des permissions
  await prisma.permission.create({
    data: {
      utilisateurId: user1.id,
      tacheId: task2.id,
      typePermission: 'MODIFIER',
    },
  });

  await prisma.permission.create({
    data: {
      utilisateurId: user2.id,
      tacheId: task1.id,
      typePermission: 'SUPPRIMER',
    },
  });

  // Créer des historiques
  await prisma.historique.create({
    data: {
      action: 'MODIFICATION',
      utilisateurId: user1.id,
      tacheId: task1.id,
      dateAction: new Date('2023-10-01T10:00:00Z'),
    },
  });

  await prisma.historique.create({
    data: {
      action: 'LECTURE',
      utilisateurId: user2.id,
      tacheId: task2.id,
      dateAction: new Date('2023-10-02T14:00:00Z'),
    },
  });

  console.log('Seeding terminé avec succès');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });