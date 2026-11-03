import { test, expect } from '@playwright/test';

test.describe('Fluxo Completo de Gerenciamento de Produtos', () => {
  let mockDatabase = [
    {
      id: 1,
      name: 'Monitor UltraWide LG',
      price: 1899.9,
      quantity: 5,
      category: 'Monitores',
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'Teclado Mecânico Keychron',
      price: 650.0,
      quantity: 12,
      category: 'Periféricos',
      created_at: new Date().toISOString(),
    },
  ];

  test.beforeEach(async ({ page }) => {
    // Reset database state before each test run
    mockDatabase = [
      {
        id: 1,
        name: 'Monitor UltraWide LG',
        price: 1899.9,
        quantity: 5,
        category: 'Monitores',
        created_at: new Date().toISOString(),
      },
      {
        id: 2,
        name: 'Teclado Mecânico Keychron',
        price: 650.0,
        quantity: 12,
        category: 'Periféricos',
        created_at: new Date().toISOString(),
      },
    ];

    // Mock API requests directed to backend (http://localhost:8000)
    await page.route('http://localhost:8000/products/**', async (route) => {
      const request = route.request();
      const method = request.method();
      const url = request.url();

      if (method === 'GET') {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockDatabase),
        });
      }

      if (method === 'POST') {
        const body = JSON.parse(request.postData() || '{}');
        const newProduct = {
          id: mockDatabase.length + 1,
          name: body.name,
          price: Number(body.price),
          quantity: Number(body.quantity),
          category: body.category,
          created_at: new Date().toISOString(),
        };
        mockDatabase.push(newProduct);
        return route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify(newProduct),
        });
      }

      if (method === 'PUT') {
        const idMatch = url.match(/\/products\/(\d+)/);
        const id = idMatch ? Number(idMatch[1]) : null;
        const body = JSON.parse(request.postData() || '{}');
        const index = mockDatabase.findIndex((p) => p.id === id);

        if (index !== -1) {
          mockDatabase[index] = {
            ...mockDatabase[index],
            name: body.name,
            price: Number(body.price),
            quantity: Number(body.quantity),
            category: body.category,
          };
          return route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockDatabase[index]),
          });
        }
        return route.fulfill({ status: 404 });
      }

      if (method === 'DELETE') {
        const idMatch = url.match(/\/products\/(\d+)/);
        const id = idMatch ? Number(idMatch[1]) : null;
        mockDatabase = mockDatabase.filter((p) => p.id !== id);
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Deleted successfully' }),
        });
      }

      return route.continue();
    });
  });

  test('troca o idioma e atualiza os textos da página e do formulário', async ({
    page,
  }) => {
    await page.goto('/pt-br/produtos');
    await page.getByRole('combobox', { name: 'Idioma' }).selectOption('en-us');

    await expect(page).toHaveURL(/en-us\/produtos/);
    await expect(
      page.getByRole('heading', { name: 'Products', exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole('searchbox', { name: 'Search products' })
    ).toBeVisible();
    await page.getByRole('button', { name: 'New product' }).click();

    const formModal = page.getByRole('dialog');
    await expect(
      formModal.getByRole('heading', { name: 'Add new product' })
    ).toBeVisible();
    await formModal.getByRole('button', { name: 'Save product' }).click();
    await expect(
      formModal.getByText('Product name is required.')
    ).toBeVisible();
  });

  test('executa fluxo completo: criar, pesquisar, editar e remover produto', async ({
    page,
  }) => {
    // a. Acessar a página de produtos
    await page.goto('/pt-br/produtos');
    await expect(page).toHaveURL(/produtos/);
    await expect(page.locator('h1')).toHaveText('Produtos');

    // Valida que itens iniciais foram carregados na tabela
    await expect(
      page.getByRole('cell', { name: 'Monitor UltraWide LG', exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole('cell', { name: 'Teclado Mecânico Keychron', exact: true })
    ).toBeVisible();

    // b. Clicar em Adicionar, preencher o formulário e salvar (RF1)
    await page.getByRole('button', { name: /novo produto/i }).click();

    // Modal de cadastro deve abrir
    const formModal = page.getByRole('dialog');
    await expect(
      formModal.getByRole('heading', { name: /cadastrar novo produto/i })
    ).toBeVisible();

    await formModal.getByLabel(/nome do produto/i).fill('Mouse Gamer Sem Fio');
    await formModal.getByLabel(/preço/i).fill('249.90');
    await formModal.getByLabel(/quantidade em estoque/i).fill('15');
    await formModal.getByLabel(/categoria/i).fill('Periféricos');

    await formModal.getByRole('button', { name: /salvar produto/i }).click();

    // Produto deve aparecer na tabela
    await expect(
      page.getByRole('cell', { name: 'Mouse Gamer Sem Fio', exact: true })
    ).toBeVisible();
    await expect(page.getByText(/249,90/)).toBeVisible();

    // c. Usar a barra de pesquisa para encontrar o produto recém-criado (RF4)
    const searchInput = page.getByRole('searchbox', {
      name: /barra de pesquisa de produtos/i,
    });
    await searchInput.fill('Mouse');

    // Apenas "Mouse Gamer Sem Fio" deve estar visível
    await expect(
      page.getByRole('cell', { name: 'Mouse Gamer Sem Fio', exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole('cell', { name: 'Monitor UltraWide LG', exact: true })
    ).not.toBeVisible();
    await expect(
      page.getByRole('cell', { name: 'Teclado Mecânico Keychron', exact: true })
    ).not.toBeVisible();

    // Limpa a busca para restaurar lista completa
    await searchInput.fill('');
    await expect(
      page.getByRole('cell', { name: 'Monitor UltraWide LG', exact: true })
    ).toBeVisible();

    // d. Clicar em Editar, alterar o nome/preço e salvar (RF2)
    const editBtn = page.getByRole('button', {
      name: /editar mouse gamer sem fio/i,
    });
    await editBtn.click();

    // Modal de edição deve abrir com dados atuais
    const editModal = page.getByRole('dialog');
    await expect(
      editModal.getByRole('heading', { name: /editar produto/i })
    ).toBeVisible();
    await expect(editModal.getByLabel(/nome do produto/i)).toHaveValue(
      'Mouse Gamer Sem Fio'
    );

    // Altera nome e preço
    await editModal.getByLabel(/nome do produto/i).fill('Mouse Gamer Pro RGB');
    await editModal.getByLabel(/preço/i).fill('319.90');

    await editModal.getByRole('button', { name: /atualizar produto/i }).click();

    // Dados atualizados devem ser refletidos na tabela
    await expect(
      page.getByRole('cell', { name: 'Mouse Gamer Pro RGB', exact: true })
    ).toBeVisible();
    await expect(page.getByText(/319,90/)).toBeVisible();

    // e. Clicar em Remover e confirmar no modal (RF3)
    const deleteBtn = page.getByRole('button', {
      name: /remover mouse gamer pro rgb/i,
    });
    await deleteBtn.click();

    // Modal de confirmação deve aparecer
    const deleteModal = page.getByRole('dialog');
    await expect(
      deleteModal.getByText('Você tem certeza que deseja remover esse produto?')
    ).toBeVisible();
    await expect(deleteModal.getByText('Mouse Gamer Pro RGB')).toBeVisible();

    // Confirma exclusão clicando em "Sim"
    await deleteModal.getByRole('button', { name: /^sim$/i }).click();

    // Produto deve sumir da tabela
    await expect(
      page.getByRole('cell', { name: 'Mouse Gamer Pro RGB', exact: true })
    ).not.toBeVisible();
  });
});
