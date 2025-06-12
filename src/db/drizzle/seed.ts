import { JsonPostRepository } from '@/repositories/post/json-post-repository';
import { drizzleDb } from '.';
import { postsTable } from './schemas';

(async () => {
  const jsonPostRepository = new JsonPostRepository();
  const posts = await jsonPostRepository.findAll();

  try {
    await drizzleDb.delete(postsTable); // LIMPA A BASE DE DADOS SEM O WHERE
    await drizzleDb.insert(postsTable).values(posts);

    console.log(`\n ${posts.length} novos posts foram criados na base\n\n`);
  } catch (e) {
    console.log('\n Ocorreu um erro\n\n', e);
  }
})();
