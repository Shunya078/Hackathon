class Task
  attr_accessor :task_name, :due_on, :finished_at, :comment

  def initialize(task_name:, due_on: nil, finished_at: nil, comment: nil)
    @task_name = task_name
    @due_on = due_on
    @finished_at = finished_at
    @comment = comment
  end

  def format_created_task
    "#{@task_name},#{Date.today},#{@due_on},yet,#{@comment}\n"
  end

  def format_finished_task
    "#{@task_name},#{Date.today},#{@finished_at},done\n"
  end
end
