document.addEventListener('DOMContentLoaded', function () {
  // Récupération et affichage initial des tâches au chargement de la page
  fetchTasks();

  // Ajout d'un écouteur d'événements sur le bouton pour ajouter une nouvelle tâche
  document.getElementById('addTask').addEventListener('click', async () => {
    const taskTitleInput = document.getElementById('newTaskTitle');
    const title = taskTitleInput.value.trim();
    if (title) {
      await addTask({ title });
      taskTitleInput.value = ''; // Réinitialiser le champ de saisie
    }
  });
});

// Fonction pour récupérer les tâches depuis le backend et les afficher
async function fetchTasks() {
  try {
    const response = await fetch('http://localhost:3000/tasks');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const tasks = await response.json();

    const tasksList = document.getElementById('tasksList');
    tasksList.innerHTML = ''; // Effacer la liste actuelle avant d'afficher les nouvelles tâches
    tasks.forEach((task) => {
      const li = document.createElement('li');
      li.textContent = task.title; // Modifier en fonction de la structure de votre objet tâche
      tasksList.appendChild(li);
    });
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
  }
}

// Fonction pour envoyer une nouvelle tâche au backend
async function addTask(task) {
  try {
    await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    fetchTasks(); // Rafraîchir la liste des tâches après l'ajout
  } catch (error) {
    console.error('Failed to add a new task:', error);
  }
}
