
import { ExpertCard } from './ExpertCard';



const experts = [
  {
    name: 'Eng Norah Seini',
    title: 'Agricultural Engineer',
    imageUrl: 'https://i.pinimg.com/236x/dd/3b/cf/dd3bcffac74ad6a1b854ea36023192a2.jpg'
  },
  {
    name: 'leo messi',
    title: 'Soil Engineer',
    imageUrl: 'https://i.pinimg.com/236x/5d/17/47/5d1747fb6f27dc9515ca3b3a5309a26c.jpg'
  },
  {
    name: 'Victor Shape',
    title: 'Agricultural Engineer',
    imageUrl: 'https://images.unsplash.com/photo-1530062845289-9109b2c9c868?auto=format&fit=crop&w=200&h=200'
  }
];

export function ExpertsSection() {
  return (
    <section className="experts-section">
      <h1>Learn from Top Agricultural Experts</h1>
      <p>Connect with leading professionals who are shaping the future of agriculture.</p>
      <div className="experts-grid">
        {experts.map((expert) => (
          <ExpertCard key={expert.name} {...expert}/>   
        ))}
      </div>
    </section>
  );
}