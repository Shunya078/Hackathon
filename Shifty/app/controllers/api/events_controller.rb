module Api
      class EventsController < ApplicationController

        def index
          @shifts = UserShift.where('start_datetime >= ? and end_datetime <= ?', params[:start], params[:end]).order(:id)
          json = @shifts.map(&:calender_json)
          render json: json.to_json
        end
      end
  end