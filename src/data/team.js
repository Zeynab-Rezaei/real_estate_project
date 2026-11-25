export const team = [
  {
    id: 'daniel-morgan',
    name: 'Daniel Morgan',
    role: 'Managing Director',
    photo: '1560250097-0b93528c311a',
    email: 'daniel@horizonproperties.com',
    phone: '+1 (555) 246-7890',
    bio: 'Daniel founded Horizon Properties in 2008 and leads the firm’s private-client practice across Texas and the West Coast.',
  },
  {
    id: 'olivia-carter',
    name: 'Olivia Carter',
    role: 'Luxury Property Advisor',
    photo: '1573497019940-1c28c88b4f3e',
    email: 'olivia@horizonproperties.com',
    phone: '+1 (555) 246-7891',
    bio: 'Olivia advises buyers on coastal and waterfront residences, with a particular eye for architecturally significant homes.',
  },
  {
    id: 'james-wilson',
    name: 'James Wilson',
    role: 'Investment Consultant',
    photo: '1507003211169-0a1dd7228f2d',
    email: 'james@horizonproperties.com',
    phone: '+1 (555) 246-7892',
    bio: 'James structures residential investment portfolios and advises international clients on US property acquisitions.',
  },
  {
    id: 'sophia-bennett',
    name: 'Sophia Bennett',
    role: 'Senior Property Specialist',
    photo: '1494790108377-be9c29b29330',
    email: 'sophia@horizonproperties.com',
    phone: '+1 (555) 246-7893',
    bio: 'Sophia guides families through relocation and long-term purchases, from first viewing to closing day.',
  },
];

export function getAgent(id) {
  return team.find((member) => member.id === id) || team[0];
}
