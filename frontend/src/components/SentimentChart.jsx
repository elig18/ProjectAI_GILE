// installation react -Chartjs
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

//Enregistrer les composants Chart
ChartJS.register(ArcElement, Tooltip, Legend);

function SentimentChart({ sentimentDistribution }) {
  const data = {
    labels: ['Positif 😊', 'Neutre 😐', 'Négatif 😞'],
    datasets: [
      {
        label: 'Nombre d\'avis',
        data: [
          sentimentDistribution.positif,
          sentimentDistribution.neutre,
          sentimentDistribution.négatif
        ],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',   // Vert pour positif
          'rgba(156, 163, 175, 0.8)',  // Gris pour neutre
          'rgba(239, 68, 68, 0.8)'     // Rouge pour négatif
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(156, 163, 175, 1)',
          'rgba(239, 68, 68, 1)'
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14,
            family: "'Inter', sans-serif"
          },
          padding: 15,
          usePointStyle: true,
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
            return `${label}: ${value} avis (${percentage}%)`;
          }
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        padding: 12,
        cornerRadius: 8,
      }
    }
  };

  //Si aucun avis, afficher un message
  const totalAvis = sentimentDistribution.positif + sentimentDistribution.neutre + sentimentDistribution.négatif;
  
  if (totalAvis === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Aucun avis pour afficher le graphique</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Pie data={data} options={options} />
    </div>
  );
}

export default SentimentChart;