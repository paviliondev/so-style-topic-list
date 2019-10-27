require 'rails_helper'

describe so-style-topic-list::ActionsController do
  before do
    Jobs.run_immediately!
  end

  it 'can list' do
    sign_in(Fabricate(:user))
    get "/so-style-topic-list/list.json"
    expect(response.status).to eq(200)
  end
end
