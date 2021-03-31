class UserShiftsController < ApplicationController
    before_action :set_shift, only: [:show, :edit, :update, :destroy]

    def index
        @shifts = Usershift.all

        respond_to do |format|
            format.html # index.html.erb
            format.xml { render :xml => @shifts }
            format.json { render :json => @shifts }
        end
    end

    def show
    end

    def new
        @shift = UserShift.new
    end

    def edit
    end

    def create
        @shift = UserShift.new(shift_params)
        respond_to do |format|
            if @shift.save
              format.html { redirect_to @shift, notice: 'Event was successfully created.' }
              format.json { render :show, status: :created, location: @shift }
            else
              format.html { render :new }
              format.json { render json: @shift.errors, status: :unprocessable_entity }
            end
          end
    end


    def update
        respond_to do |format|
            if @shift.update(shift_params)
              format.json { render :show, status: :ok, location: @shift }
            else
              format.html { render :edit }
              format.json { render json: @shift.errors, status: :unprocessable_entity }
            end
          end
    end

    def destroy
        @shift.destroy
        respond_to do |format|
          format.json { head :no_content }
        end
    end

    private

        def set_shift
            @shift = UserShift.find(params[:id])
        end

        def shift_params
            # 確認
            params.require(:shift).permit(
                :user_id,
                :start_datetime,
                :end_datetime,
            )
        end
end
