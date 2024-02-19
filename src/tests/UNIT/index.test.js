const sinon = require('sinon');
const validates = require('../../services');
const { comandsModel } = require('../../model');
const chai = require('chai');

const { expect } = chai;

describe('Testes Unitarios', () => {
  beforeEach(sinon.restore);
  it('Testa se o listenComand retorna false para mensagens', () => {
    const teste = validates.listenComand('issoComCertezaNãoÉUmComando')
    expect(teste).to.be.false;
  });
  it('Testa se o listenComand retorna true para comandos', () => {
    const teste = validates.listenComand('+gp')
    expect(teste).to.be.true;
  });
  it('Testa se o comando isGroupValidate retorna false caso seja um grupo', () => {
    const teste = validates.isGroupValidate({ participant: "whow im a test" });
    expect(teste).to.be.false;
  });
  it('Testa se o comando isGroupValidate retorna uma mensagem caso não seja um grupo', () => {
    const teste = validates.isGroupValidate({ test: "whow im a test" });
    expect(teste).to.be.eq('* Este comando funciona apenas em grupos');
  });
  it('Testa o comando allValidates juntamente dos adds && deletes', async () => {
    const gp = 'its a test gp';
    const user = 'its a test user';
    await comandsModel.addGroupPerms(gp);
    await comandsModel.addUserPerms(user);

    const teste = await validates.allValidates(gp, user);

    expect(teste).to.be.false;

    await comandsModel.deleteUserPerms(user);
    await comandsModel.deleteGroupPerms(gp);

    const teste2 = await validates.allValidates(gp, user);

    expect(teste2).not.to.be.false;
  });
})