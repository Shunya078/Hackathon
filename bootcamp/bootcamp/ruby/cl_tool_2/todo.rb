require 'date'
require 'csv'
require './task.rb'

class TodoManager
  TODO_LIST_FILE = 'todo_list.csv'

  def initialize(
    command:,
    task_name: nil,
    date: nil,
    comment: nil,
    row_number: nil,
    list_option: nil
  )
    parse_date(date) if !@date.nil?
    @command = command
    @new_task =
      Task.new(
        task_name: task_name, due_on: date, finished_at: date, comment: comment
      )
    @row_number = row_number
    @list_option = list_option
  end

  def execute
    case @command
    when '-h', '--help'
      show_help
    when '-c', '--create'
      raise 'task or date is nil' if @new_task.nil?
      create_task
      puts 'Succesfully creating Task!'
    when '-d', '--delete'
      raise 'row_number is nil' if @row_number.nil?
      delete_task
      puts 'Succesfully deleting Task!'
    when '-f', '--finish'
      raise 'task or date is nil' if @new_task.nil?
      finish_task
      puts 'Succesfully finishing Task!'
    when '-s', '--show'
      raise 'list_option is nil' if @list_option.nil?
      manage_showed_list_file
    when '--sort'
      sort_task
      puts 'Succesfully sorting Task!'
    end
  end

  private

  def create_task
    File.open(TODO_LIST_FILE, 'a') do |file|
      file.write(@new_task.format_created_task)
    end
  end

  def finish_task
    File.open(TODO_LIST_FILE, 'a') do |file|
      file.write(@new_task.format_finished_task)
    end
  end

  def delete_task
    raise "1 is header, You don't delete header." if @row_number == '1'
    lines = File.open(TODO_LIST_FILE).readlines
    lines.delete_at(@row_number.to_i - 1)
    save_file(TODO_LIST_FILE, lines)
  end

  def manage_showed_list_file
    case @list_option
    when 'all'
      show_all_task
    when 'done'
      show_limited_task(@list_option)
    when 'yet'
      show_limited_task(@list_option)
    when 'today'
      show_today_task
    end
  end

  def show_all_task
    File.open(TODO_LIST_FILE).each_line.with_index(1) do |line, line_number|
      puts "#{line_number}) #{line}"
    end
  end

  def show_limited_task(state)
    File.open(TODO_LIST_FILE).each_line do |line|
      puts "#{line}" if line.include?("#{state}")
    end
  end

  def show_today_task
    File.open(TODO_LIST_FILE).each_line do |line|
      puts "#{line}" if (line.include?('yet') && line.include?("#{Date.today}"))
    end
  end

  def sort_task
    # ---------* 以下CSV sort機能 *---------
    # csv =
    #   CSV.foreach(TODO_LIST_FILE, headers: true).sort_by do |line|
    #     line['date(due_on/finish_date)']
    #   end
    # CSV.open(TODO_LIST_FILE, 'w') do |csv_object|
    #   csv_object <<
    #     %w[task_name created_at date(due_on/finish_date) state comment]
    #   csv.each { |row_array| csv_object << row_array }
    # end
    # -------------------------------------
    tasks =
      CSV.foreach(TODO_LIST_FILE, headers: true).sort_by do |line|
        line['date(due_on/finish_date)']
      end
    puts tasks
  end

  def parse_date(date)
    Date.strptime(date, '%Y-%m-%d')
  rescue ArgumentError
    raise "You Change [#{date} -> YYYY-MM-DD]"
  end

  def save_file(csv_file, lines)
    File.open(csv_file, 'w') { |file| lines.each { |line| file << line } }
  end

  def show_help
    puts <<~'EOS'
      Management your to do task!
      Usage: %ruby todo.rb [-options]
      -h --help     , show help           / %ruby todo.rb -h
      -c --create   , add new task        / %ruby todo.rb -c task_name due_on "comment"
                                          / ※ comment must use "".
      -d --delete   , delete task         / %ruby todo.rb -d row_number
      -f --finish   , finish task         / %ruby todo.rb -f task_name finish_date
      -t --today    , show on date task   / %ruby todo.rb -t date
      -s --show     , show task list      / %ruby todo.rb -s list_option(all, done, yet, today)
      --sort        , sort task list      / %ruby todo.rb --sort
    EOS
  end
end

if __FILE__ == $0
  todo_manager =
    case ARGV[0]
    when '-h', '--help', '--sort'
      TodoManager.new(command: ARGV[0])
    when '-c', '--create', '-f', '--finish'
      TodoManager.new(
        command: ARGV[0], task_name: ARGV[1], date: ARGV[2], comment: ARGV[3]
      )
    when '-d', '--delete'
      TodoManager.new(command: ARGV[0], row_number: ARGV[1])
    when '-f', '--finish'
      TodoManager.new(command: ARGV[0], task_name: ARGV[1], date: ARGV[2])
    when '-t', '--today'
      TodoManager.new(command: ARGV[0], date: ARGV[1])
    when '-s', '--show'
      TodoManager.new(command: ARGV[0], list_option: ARGV[1])
    end
  todo_manager.execute
end
