require 'sinatra/base'
require 'json'

class ThermostatAPI < Sinatra::Base
  enable :sessions
  set :session_secret, 'secret'

  get '/temperature/:temp' do
    session[:user_temp] ||= params[:temp]
    temp_json = { temperature: session[:user_temp] }
    JSON.generate(temp_json)
  end

  post '/temperature' do
    session[:user_temp] = params[:current_temp]
  end
end
