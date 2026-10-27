export default function HealthRoute() {
  return new Response(JSON.stringify({ status: 'ok', service: 'keywords-planner' }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
}
